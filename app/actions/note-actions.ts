"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createNote(formData: FormData) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return { success: false, error: "Not authenticated" }
  }

  const note = {
    lead_id: formData.get("lead_id") as string,
    agent_id: session.user.id,
    content: formData.get("content") as string,
  }

  const { error } = await supabase.from("notes").insert(note)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath(`/agent-dashboard/leads/${note.lead_id}`)
  return { success: true }
}

export async function updateNote(formData: FormData) {
  const supabase = createClient()

  const id = formData.get("id") as string
  const content = formData.get("content") as string
  const leadId = formData.get("lead_id") as string

  const { error } = await supabase.from("notes").update({ content }).eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath(`/agent-dashboard/leads/${leadId}`)
  return { success: true }
}

export async function deleteNote(id: string, leadId: string) {
  const supabase = createClient()

  const { error } = await supabase.from("notes").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath(`/agent-dashboard/leads/${leadId}`)
  return { success: true }
}

export async function getNotesForLead(leadId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching notes:", error)
    return []
  }

  return data
}

