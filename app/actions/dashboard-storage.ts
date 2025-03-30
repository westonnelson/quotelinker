"use server"

import { createClient } from "@/lib/supabase/server"

export async function getDashboardStats(agentId?: string) {
  const supabase = createClient()

  try {
    let leadsQuery = supabase.from("leads")

    // If agent ID is provided, only get stats for that agent
    if (agentId) {
      leadsQuery = leadsQuery.eq("assigned_to", agentId)
    }

    // Get total leads
    const { count: totalLeads, error: leadsError } = await leadsQuery.select("*", { count: "exact", head: true })

    if (leadsError) {
      console.error("Error fetching total leads:", leadsError)
      return { success: false, error: leadsError.message }
    }

    // Get contacted leads
    const { count: contactedLeads, error: contactedError } = await leadsQuery
      .select("*", { count: "exact", head: true })
      .eq("contacted", true)

    if (contactedError) {
      console.error("Error fetching contacted leads:", contactedError)
      return { success: false, error: contactedError.message }
    }

    // Get leads by status
    const { data: statusData, error: statusError } = await leadsQuery.select("status")

    if (statusError) {
      console.error("Error fetching lead statuses:", statusError)
      return { success: false, error: statusError.message }
    }

    // Count leads by status
    const statusCounts = statusData.reduce((acc: Record<string, number>, lead) => {
      const status = lead.status || "unknown"
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {})

    // Get unassigned leads (admin only)
    let unassignedLeads = 0
    if (!agentId) {
      const { count, error: unassignedError } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .is("assigned_to", null)

      if (unassignedError) {
        console.error("Error fetching unassigned leads:", unassignedError)
      } else {
        unassignedLeads = count || 0
      }
    }

    // Get total agents (admin only)
    let totalAgents = 0
    if (!agentId) {
      const { count, error: agentsError } = await supabase
        .from("agent_profiles")
        .select("*", { count: "exact", head: true })

      if (agentsError) {
        console.error("Error fetching total agents:", agentsError)
      } else {
        totalAgents = count || 0
      }
    }

    // Get recent leads
    const { data: recentLeads, error: recentLeadsError } = await leadsQuery
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
      console.error("Error fetching recent leads:", recentLeadsError)
      return { success: false, error: recentLeadsError.message }
    }

    return {
      success: true,
      data: {
        totalLeads: totalLeads || 0,
        contactedLeads: contactedLeads || 0,
        unassignedLeads: unassignedLeads,
        pendingLeads: (totalLeads || 0) - (contactedLeads || 0),
        totalAgents: totalAgents,
        statusCounts,
        recentLeads: recentLeads || [],
      },
    }
  } catch (error) {
    console.error("Error in getDashboardStats:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

