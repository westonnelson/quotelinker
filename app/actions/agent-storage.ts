"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type AgentData = {
  id?: string
  full_name: string
  agency_name: string
  email: string
  phone: string
  states_licensed: string[]
  lines_of_insurance: string[]
  custom_package_request?: boolean
  notification_preferences?: any
  created_at?: string
}

// CREATE
export async function createAgentProfile(agentData: AgentData, password?: string) {
  const supabase = createClient()

  try {
    // If password is provided, create auth user first
    if (password && agentData.email) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: agentData.email,
        password: password,
      })

      if (authError) {
        console.error("Error creating auth user:", authError)
        return { success: false, error: authError.message }
      }

      if (authData.user) {
        // Use the auth user ID for the agent profile
        agentData.id = authData.user.id
      } else {
        return { success: false, error: "Failed to create auth user" }
      }
    }

    if (!agentData.id) {
      return { success: false, error: "Agent ID is required" }
    }

    const { data, error } = await supabase
      .from("agent_profiles")
      .insert({
        id: agentData.id,
        full_name: agentData.full_name,
        agency_name: agentData.agency_name,
        email: agentData.email,
        phone: agentData.phone,
        states_licensed: agentData.states_licensed,
        lines_of_insurance: agentData.lines_of_insurance,
        custom_package_request: agentData.custom_package_request || false,
        notification_preferences: agentData.notification_preferences || {
          email_new_leads: true,
          email_lead_updates: true,
          sms_new_leads: false,
          sms_lead_updates: false,
        },
      })
      .select()

    if (error) {
      console.error("Error creating agent profile:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/agents")
    return { success: true, data: data[0] }
  } catch (error) {
    console.error("Error in createAgentProfile:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// READ
export async function getAgentProfileById(id: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from("agent_profiles").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching agent profile:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in getAgentProfileById:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getAllAgentProfiles(options?: {
  search?: string
  limit?: number
  offset?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
  includeStats?: boolean
}) {
  const supabase = createClient()

  try {
    let query = supabase.from("agent_profiles").select("*")

    // Apply search
    if (options?.search) {
      const searchTerm = `%${options.search}%`
      query = query.or(`full_name.ilike.${searchTerm},agency_name.ilike.${searchTerm},email.ilike.${searchTerm}`)
    }

    // Apply sorting
    if (options?.sortBy) {
      query = query.order(options.sortBy, { ascending: options.sortOrder === "asc" })
    } else {
      query = query.order("full_name", { ascending: true })
    }

    // Apply pagination
    if (options?.limit) {
      query = query.limit(options.limit)
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching agent profiles:", error)
      return { success: false, error: error.message }
    }

    // If stats are requested, fetch lead counts for each agent
    if (options?.includeStats && data) {
      const agentsWithStats = await Promise.all(
        data.map(async (agent) => {
          const { count: totalLeads } = await supabase
            .from("leads")
            .select("*", { count: "exact", head: true })
            .eq("assigned_to", agent.id)

          const { count: contactedLeads } = await supabase
            .from("leads")
            .select("*", { count: "exact", head: true })
            .eq("assigned_to", agent.id)
            .eq("contacted", true)

          return {
            ...agent,
            stats: {
              totalLeads: totalLeads || 0,
              contactedLeads: contactedLeads || 0,
              pendingLeads: (totalLeads || 0) - (contactedLeads || 0),
            },
          }
        }),
      )

      return { success: true, data: agentsWithStats }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in getAllAgentProfiles:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// UPDATE
export async function updateAgentProfile(id: string, agentData: Partial<AgentData>) {
  const supabase = createClient()

  try {
    const { error } = await supabase.from("agent_profiles").update(agentData).eq("id", id)

    if (error) {
      console.error("Error updating agent profile:", error)
      return { success: false, error: error.message }
    }

    // If email was updated, update auth user email
    if (agentData.email) {
      const { error: authError } = await supabase.auth.updateUser({
        email: agentData.email,
      })

      if (authError) {
        console.error("Failed to update auth email:", authError)
        // Continue anyway as the profile was updated
      }
    }

    revalidatePath("/agent-dashboard/profile")
    revalidatePath("/admin/agents")
    return { success: true }
  } catch (error) {
    console.error("Error in updateAgentProfile:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// DELETE
export async function deleteAgentProfile(id: string, reassignLeadsTo?: string | null) {
  const supabase = createClient()

  try {
    // First handle lead reassignment
    if (reassignLeadsTo) {
      const { error: updateError } = await supabase
        .from("leads")
        .update({ assigned_to: reassignLeadsTo })
        .eq("assigned_to", id)

      if (updateError) {
        console.error("Error reassigning leads:", updateError)
        return { success: false, error: updateError.message }
      }
    } else {
      // If no reassignment, set leads to unassigned
      const { error: updateError } = await supabase.from("leads").update({ assigned_to: null }).eq("assigned_to", id)

      if (updateError) {
        console.error("Error unassigning leads:", updateError)
        return { success: false, error: updateError.message }
      }
    }

    // Delete agent's notes
    await supabase.from("notes").delete().eq("agent_id", id)

    // Get document paths to delete from storage
    const { data: documents } = await supabase.from("documents").select("file_path").eq("agent_id", id)

    if (documents && documents.length > 0) {
      // Delete files from storage
      const filePaths = documents.map((doc) => doc.file_path)
      await supabase.storage.from("documents").remove(filePaths)

      // Delete document records
      await supabase.from("documents").delete().eq("agent_id", id)
    }

    // Delete the agent profile
    const { error: deleteProfileError } = await supabase.from("agent_profiles").delete().eq("id", id)

    if (deleteProfileError) {
      console.error("Error deleting agent profile:", deleteProfileError)
      return { success: false, error: deleteProfileError.message }
    }

    // Delete the auth user
    const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(id)

    if (deleteAuthError) {
      console.error("Error deleting auth user:", deleteAuthError)
      // Continue anyway since the profile is deleted
    }

    revalidatePath("/admin/agents")
    return { success: true }
  } catch (error) {
    console.error("Error in deleteAgentProfile:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

