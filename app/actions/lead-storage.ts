"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { sendLeadConfirmationEmail, sendAgentLeadNotificationEmail } from "./email-actions"

export type LeadData = {
  id?: string
  full_name: string
  email: string
  phone: string
  zip_code: string
  insurance_type: string
  privacy_consent: boolean
  status?: string
  contacted?: boolean
  assigned_to?: string | null
  created_at?: string
}

// CREATE
export async function createLeadRecord(leadData: LeadData) {
  const supabase = createClient()

  try {
    // Set default values
    const lead = {
      ...leadData,
      status: leadData.status || "new",
      contacted: leadData.contacted || false,
    }

    const { data, error } = await supabase.from("leads").insert(lead).select()

    if (error) {
      console.error("Error creating lead:", error)
      return { success: false, error: error.message }
    }

    const newLead = data[0]

    // Send confirmation email to the lead if email is provided
    if (lead.email) {
      try {
        await sendLeadConfirmationEmail(lead)
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError)
        // Continue with the process even if email fails
      }
    }

    // Try to assign to an agent if not already assigned
    if (!lead.assigned_to) {
      try {
        // Find an agent that covers this zip code's state
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
          }
        }
      } catch (assignError) {
        console.error("Error assigning lead to agent:", assignError)
      }
    }

    revalidatePath("/agent-dashboard")
    revalidatePath("/admin/leads")
    return { success: true, data: newLead }
  } catch (error) {
    console.error("Error in createLeadRecord:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// READ
export async function getLeadById(id: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("leads")
      .select(`
        *,
        agent_profiles:assigned_to (
          id,
          full_name,
          agency_name,
          email,
          phone
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching lead:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in getLeadById:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getAllLeads(options?: {
  filter?: "all" | "contacted" | "pending" | "assigned" | "unassigned"
  search?: string
  limit?: number
  offset?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}) {
  const supabase = createClient()

  try {
    let query = supabase.from("leads").select(`
        *,
        agent_profiles:assigned_to (
          id,
          full_name,
          agency_name
        )
      `)

    // Apply filters
    if (options?.filter) {
      switch (options.filter) {
        case "contacted":
          query = query.eq("contacted", true)
          break
        case "pending":
          query = query.eq("contacted", false)
          break
        case "assigned":
          query = query.not("assigned_to", "is", null)
          break
        case "unassigned":
          query = query.is("assigned_to", null)
          break
      }
    }

    // Apply search
    if (options?.search) {
      const searchTerm = `%${options.search}%`
      query = query.or(
        `full_name.ilike.${searchTerm},email.ilike.${searchTerm},phone.ilike.${searchTerm},zip_code.ilike.${searchTerm}`,
      )
    }

    // Apply sorting
    if (options?.sortBy) {
      query = query.order(options.sortBy, { ascending: options.sortOrder === "asc" })
    } else {
      query = query.order("created_at", { ascending: false })
    }

    // Apply pagination
    if (options?.limit) {
      query = query.limit(options.limit)
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error, count } = await query

    if (error) {
      console.error("Error fetching leads:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data, count }
  } catch (error) {
    console.error("Error in getAllLeads:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// UPDATE
export async function updateLeadRecord(id: string, leadData: Partial<LeadData>) {
  const supabase = createClient()

  try {
    // Get current lead data to check for agent assignment changes
    const { data: currentLead } = await supabase.from("leads").select("assigned_to").eq("id", id).single()

    const { error } = await supabase.from("leads").update(leadData).eq("id", id)

    if (error) {
      console.error("Error updating lead:", error)
      return { success: false, error: error.message }
    }

    // If agent assignment changed, send notification
    if (leadData.assigned_to && currentLead && leadData.assigned_to !== currentLead.assigned_to) {
      try {
        await sendAgentLeadNotificationEmail(id, leadData.assigned_to)
      } catch (emailError) {
        console.error("Error sending agent notification email:", emailError)
      }
    }

    revalidatePath("/agent-dashboard")
    revalidatePath("/admin/leads")
    return { success: true }
  } catch (error) {
    console.error("Error in updateLeadRecord:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// DELETE
export async function deleteLeadRecord(id: string) {
  const supabase = createClient()

  try {
    // First delete related records (notes, documents)
    await supabase.from("notes").delete().eq("lead_id", id)

    // Get document paths to delete from storage
    const { data: documents } = await supabase.from("documents").select("file_path").eq("lead_id", id)

    if (documents && documents.length > 0) {
      // Delete files from storage
      const filePaths = documents.map((doc) => doc.file_path)
      await supabase.storage.from("documents").remove(filePaths)

      // Delete document records
      await supabase.from("documents").delete().eq("lead_id", id)
    }

    // Finally delete the lead
    const { error } = await supabase.from("leads").delete().eq("id", id)

    if (error) {
      console.error("Error deleting lead:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/agent-dashboard")
    revalidatePath("/admin/leads")
    return { success: true }
  } catch (error) {
    console.error("Error in deleteLeadRecord:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// BATCH OPERATIONS
export async function batchAssignLeads(leadIds: string[], agentId: string | null) {
  const supabase = createClient()

  try {
    const { error } = await supabase.from("leads").update({ assigned_to: agentId }).in("id", leadIds)

    if (error) {
      console.error("Error batch assigning leads:", error)
      return { success: false, error: error.message }
    }

    // Send notifications to agent if assigned
    if (agentId) {
      for (const leadId of leadIds) {
        try {
          await sendAgentLeadNotificationEmail(leadId, agentId)
        } catch (emailError) {
          console.error(`Error sending notification for lead ${leadId}:`, emailError)
        }
      }
    }

    revalidatePath("/agent-dashboard")
    revalidatePath("/admin/leads")
    return { success: true }
  } catch (error) {
    console.error("Error in batchAssignLeads:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function batchUpdateLeadStatus(leadIds: string[], status: string) {
  const supabase = createClient()

  try {
    const updateData: any = { status }

    // If marked as contacted, update that field too
    if (status === "contacted" || status === "follow_up" || status === "closed") {
      updateData.contacted = true
    }

    const { error } = await supabase.from("leads").update(updateData).in("id", leadIds)

    if (error) {
      console.error("Error batch updating lead status:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/agent-dashboard")
    revalidatePath("/admin/leads")
    return { success: true }
  } catch (error) {
    console.error("Error in batchUpdateLeadStatus:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

