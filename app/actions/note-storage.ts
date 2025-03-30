"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type NoteData = {
  id?: string
  lead_id: string
  agent_id: string
  content: string
  created_at?: string
}

// CREATE
export async function createNote(noteData: NoteData) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from("notes").insert(noteData).select()

    if (error) {
      console.error("Error creating note:", error)
      return { success: false, error: error.message }
    }

    revalidatePath(`/agent-dashboard/leads/${noteData.lead_id}`)
    return { success: true, data: data[0] }
  } catch (error) {
    console.error("Error in createNote:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// READ
export async function getNoteById(id: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from("notes").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching note:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in getNoteById:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getNotesForLead(leadId: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("notes")
      .select(`
        *,
        agent_profiles:agent_id (
          full_name
        )
      `)
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching notes for lead:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in getNotesForLead:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getNotesForAgent(agentId: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("notes")
      .select(`
        *,
        leads:lead_id (
          id,
          full_name,
          email
        )
      `)
      .eq("agent_id", agentId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching notes for agent:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in getNotesForAgent:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// UPDATE
export async function updateNote(id: string, content: string) {
  const supabase = createClient()

  try {
    // First get the lead_id for revalidation
    const { data: note, error: fetchError } = await supabase.from("notes").select("lead_id").eq("id", id).single()

    if (fetchError) {
      console.error("Error fetching note:", fetchError)
      return { success: false, error: fetchError.message }
    }

    const { error } = await supabase.from("notes").update({ content }).eq("id", id)

    if (error) {
      console.error("Error updating note:", error)
      return { success: false, error: error.message }
    }

    revalidatePath(`/agent-dashboard/leads/${note.lead_id}`)
    return { success: true }
  } catch (error) {
    console.error("Error in updateNote:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// DELETE
export async function deleteNote(id: string) {
  const supabase = createClient()

  try {
    // First get the lead_id for revalidation
    const { data: note, error: fetchError } = await supabase.from("notes").select("lead_id").eq("id", id).single()

    if (fetchError) {
      console.error("Error fetching note:", fetchError)
      return { success: false, error: fetchError.message }
    }

    const { error } = await supabase.from("notes").delete().eq("id", id)

    if (error) {
      console.error("Error deleting note:", error)
      return { success: false, error: error.message }
    }

    revalidatePath(`/agent-dashboard/leads/${note.lead_id}`)
    return { success: true }
  } catch (error) {
    console.error("Error in deleteNote:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

