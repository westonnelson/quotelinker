"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { sendLeadConfirmationEmail, sendAgentLeadNotificationEmail } from "./email-actions"

export async function createLead(formData: FormData) {
  const supabase = createClient()

  const lead = {
    full_name: formData.get("full_name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    zip_code: formData.get("zip_code") as string,
    insurance_type: (formData.get("insurance_type") as string) || "Life Insurance",
    privacy_consent: formData.get("privacy_consent") === "true",
    status: "new",
  }

  // Validate privacy consent
  if (!lead.privacy_consent) {
    return { success: false, error: "Privacy consent is required" }
  }

  // Validate required fields
  if (!lead.full_name || !lead.email || !lead.phone || !lead.zip_code) {
    return { success: false, error: "All fields are required" }
  }

  try {
    const { data, error } = await supabase.from("leads").insert(lead).select()

    if (error) {
      console.error("Database error:", error)
      return { success: false, error: error.message }
    }

    const newLead = data[0]

    // Send confirmation email to the lead
    try {
      await sendLeadConfirmationEmail(lead)
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError)
      // Continue with the process even if email fails
    }

    // Try to assign to an agent based on zip code
    try {
      // Find an agent that covers this zip code's state (first 2 digits approximate)
      const { data: agents } = await supabase
        .from("agent_profiles")
        .select("*")
        .filter("lines_of_insurance", "cs", "{Life Insurance}")

      if (agents && agents.length > 0) {
        // Assign to first available agent
        const assignedAgent = agents[0]

        // Update lead with assigned agent
        await supabase.from("leads").update({ assigned_to: assignedAgent.id }).eq("id", newLead.id)

        // Send email notification to the agent
        try {
          await sendAgentLeadNotificationEmail(newLead.id, assignedAgent.id)
        } catch (emailError) {
          console.error("Error sending agent notification email:", emailError)
          // Continue with the process even if email fails
        }
      }
    } catch (assignError) {
      console.error("Error assigning lead to agent:", assignError)
      // Continue anyway, lead is still created
    }

    revalidatePath("/agent-dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error creating lead:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function updateLead(formData: FormData) {
  const supabase = createClient()

  const id = formData.get("id") as string
  const lead = {
    full_name: formData.get("full_name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    zip_code: formData.get("zip_code") as string,
    insurance_type: formData.get("insurance_type") as string,
    contacted: formData.get("contacted") === "true",
    status: (formData.get("status") as string) || undefined,
  }

  const { error } = await supabase.from("leads").update(lead).eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/agent-dashboard")
  return { success: true }
}

export async function deleteLead(id: string) {
  const supabase = createClient()

  const { error } = await supabase.from("leads").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/agent-dashboard")
  return { success: true }
}

export async function assignLead(leadId: string, agentId: string) {
  const supabase = createClient()

  const { error } = await supabase.from("leads").update({ assigned_to: agentId }).eq("id", leadId)

  if (error) {
    return { success: false, error: error.message }
  }

  // If agent was assigned, send notification email
  if (agentId) {
    await sendAgentLeadNotificationEmail(leadId, agentId)
  }

  revalidatePath("/agent-dashboard")
  revalidatePath("/admin/leads")
  return { success: true }
}

export async function markLeadAsContacted(id: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from("leads")
    .update({
      contacted: true,
      status: "contacted",
    })
    .eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/agent-dashboard")
  return { success: true }
}

export async function updateLeadStatus(id: string, status: string) {
  const supabase = createClient()

  // Map status strings to database values
  const updateData: any = {
    status: status,
  }

  // If marked as contacted, update that field too
  if (status === "contacted" || status === "follow_up" || status === "closed") {
    updateData.contacted = true
  }

  const { error } = await supabase.from("leads").update(updateData).eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/agent-dashboard")
  return { success: true }
}

