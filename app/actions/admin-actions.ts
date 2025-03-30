"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Function to check if the current user is an admin
export async function isAdmin() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return false
  }

  // Check if the user has the admin role in user_metadata
  return session.user.user_metadata?.role === "admin"
}

// Get all leads with their assigned agent information
export async function getAllLeads() {
  const supabase = createClient()

  // Check if user is admin
  if (!(await isAdmin())) {
    return { success: false, error: "Unauthorized" }
  }

  const { data, error } = await supabase
    .from("leads")
    .select(`
      *,
      agent_profiles:assigned_to (
        full_name,
        agency_name
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching leads:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

// Get all agents with their lead counts
export async function getAllAgentsWithStats() {
  const supabase = createClient()

  // Check if user is admin
  if (!(await isAdmin())) {
    return { success: false, error: "Unauthorized" }
  }

  // Get all agents
  const { data: agents, error: agentsError } = await supabase
    .from("agent_profiles")
    .select("*")
    .order("full_name", { ascending: true })

  if (agentsError) {
    console.error("Error fetching agents:", agentsError)
    return { success: false, error: agentsError.message }
  }

  // Get lead counts for each agent
  const agentsWithStats = await Promise.all(
    agents.map(async (agent) => {
      const { count: totalLeads, error: totalError } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("assigned_to", agent.id)

      const { count: contactedLeads, error: contactedError } = await supabase
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

// Delete an agent (and reassign their leads)
export async function deleteAgent(agentId: string, reassignTo: string | null) {
  const supabase = createClient()

  // Check if user is admin
  if (!(await isAdmin())) {
    return { success: false, error: "Unauthorized" }
  }

  // Start a transaction
  // First, update any leads assigned to this agent
  if (reassignTo) {
    const { error: updateError } = await supabase
      .from("leads")
      .update({ assigned_to: reassignTo })
      .eq("assigned_to", agentId)

    if (updateError) {
      return { success: false, error: updateError.message }
    }
  } else {
    // If no reassignment, set leads to unassigned
    const { error: updateError } = await supabase.from("leads").update({ assigned_to: null }).eq("assigned_to", agentId)

    if (updateError) {
      return { success: false, error: updateError.message }
    }
  }

  // Delete the agent profile
  const { error: deleteProfileError } = await supabase.from("agent_profiles").delete().eq("id", agentId)

  if (deleteProfileError) {
    return { success: false, error: deleteProfileError.message }
  }

  // Delete the auth user
  const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(agentId)

  if (deleteAuthError) {
    console.error("Error deleting auth user:", deleteAuthError)
    // Continue anyway since the profile is deleted
  }

  revalidatePath("/admin/agents")
  return { success: true }
}

// Assign a lead to an agent
export async function assignLeadToAgent(leadId: string, agentId: string | null) {
  const supabase = createClient()

  // Check if user is admin
  if (!(await isAdmin())) {
    return { success: false, error: "Unauthorized" }
  }

  const { error } = await supabase.from("leads").update({ assigned_to: agentId }).eq("id", leadId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/leads")
  return { success: true }
}

// Delete a lead
export async function deleteLead(leadId: string) {
  const supabase = createClient()

  // Check if user is admin
  if (!(await isAdmin())) {
    return { success: false, error: "Unauthorized" }
  }

  const { error } = await supabase.from("leads").delete().eq("id", leadId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/leads")
  return { success: true }
}

// Get dashboard statistics
export async function getDashboardStats() {
  const supabase = createClient()

  // Check if user is admin
  if (!(await isAdmin())) {
    return { success: false, error: "Unauthorized" }
  }

  // Get total leads
  const { count: totalLeads, error: leadsError } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })

  if (leadsError) {
    return { success: false, error: leadsError.message }
  }

  // Get contacted leads
  const { count: contactedLeads, error: contactedError } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("contacted", true)

  if (contactedError) {
    return { success: false, error: contactedError.message }
  }

  // Get unassigned leads
  const { count: unassignedLeads, error: unassignedError } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .is("assigned_to", null)

  if (unassignedError) {
    return { success: false, error: unassignedError.message }
  }

  // Get total agents
  const { count: totalAgents, error: agentsError } = await supabase
    .from("agent_profiles")
    .select("*", { count: "exact", head: true })

  if (agentsError) {
    return { success: false, error: agentsError.message }
  }

  // Get recent leads
  const { data: recentLeads, error: recentLeadsError } = await supabase
    .from("leads")
    .select(`
      *,
      agent_profiles:assigned_to (
        full_name,
        agency_name
      )
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  if (recentLeadsError) {
    return { success: false, error: recentLeadsError.message }
  }

  return {
    success: true,
    data: {
      totalLeads: totalLeads || 0,
      contactedLeads: contactedLeads || 0,
      unassignedLeads: unassignedLeads || 0,
      pendingLeads: (totalLeads || 0) - (contactedLeads || 0),
      totalAgents: totalAgents || 0,
      recentLeads: recentLeads || [],
    },
  }
}

