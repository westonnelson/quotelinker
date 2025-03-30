"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateAgentProfile(formData: FormData) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return { success: false, error: "Not authenticated" }
  }

  const agentId = session.user.id

  // Get form values
  const full_name = formData.get("full_name") as string
  const agency_name = formData.get("agency_name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const custom_package_request = formData.get("custom_package_request") === "true"

  // Get states and insurance lines as arrays
  const statesLicensed = formData.getAll("states_licensed") as string[]
  const linesOfInsurance = formData.getAll("lines_of_insurance") as string[]

  // Handle notification preferences
  let notificationPreferences = null
  const notificationPreferencesStr = formData.get("notification_preferences") as string
  if (notificationPreferencesStr) {
    try {
      notificationPreferences = JSON.parse(notificationPreferencesStr)
    } catch (e) {
      console.error("Failed to parse notification preferences", e)
    }
  }

  // Build the profile object
  const profile: Record<string, any> = {}

  // Only include fields that were submitted
  if (full_name) profile.full_name = full_name
  if (agency_name) profile.agency_name = agency_name
  if (email) profile.email = email
  if (phone) profile.phone = phone
  if (statesLicensed.length > 0) profile.states_licensed = statesLicensed
  if (linesOfInsurance.length > 0) profile.lines_of_insurance = linesOfInsurance
  if (custom_package_request !== undefined) profile.custom_package_request = custom_package_request
  if (notificationPreferences) profile.notification_preferences = notificationPreferences

  // Update the profile
  const { error } = await supabase.from("agent_profiles").update(profile).eq("id", agentId)

  if (error) {
    return { success: false, error: error.message }
  }

  // If email was updated, update auth user email
  if (email && email !== session.user.email) {
    const { error: authError } = await supabase.auth.updateUser({
      email: email,
    })

    if (authError) {
      console.error("Failed to update auth email", authError)
      // Continue anyway as the profile was updated
    }
  }

  revalidatePath("/agent-dashboard/profile")
  return { success: true }
}

export async function getAgentProfile() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return null
  }

  const { data, error } = await supabase.from("agent_profiles").select("*").eq("id", session.user.id).single()

  if (error) {
    console.error("Error fetching agent profile:", error)
    return null
  }

  return data
}

export async function getAllAgents() {
  const supabase = createClient()

  const { data, error } = await supabase.from("agent_profiles").select("*").order("full_name", { ascending: true })

  if (error) {
    console.error("Error fetching agents:", error)
    return []
  }

  return data
}

