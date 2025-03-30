"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type DocumentData = {
  id?: string
  lead_id: string
  agent_id: string
  file_name: string
  file_path: string
  document_type: string
  public_url: string
  created_at?: string
}

// CREATE
export async function uploadDocument(file: File, leadId: string, agentId: string, documentType: string) {
  const supabase = createClient()

  try {
    if (!file || !leadId || !agentId) {
      return { success: false, error: "Missing required data" }
    }

    // Create a unique file name
    const fileExt = file.name.split(".").pop()
    const fileName = `${agentId}/${leadId}/${documentType}_${Date.now()}.${fileExt}`

    // Upload file to Supabase Storage
    const { error: uploadError, data: uploadData } = await supabase.storage.from("documents").upload(fileName, file)

    if (uploadError) {
      console.error("Error uploading file:", uploadError)
      return { success: false, error: uploadError.message }
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("documents").getPublicUrl(fileName)

    // Create a record in the documents table
    const { data, error: dbError } = await supabase
      .from("documents")
      .insert({
        lead_id: leadId,
        agent_id: agentId,
        file_name: file.name,
        file_path: fileName,
        document_type: documentType,
        public_url: publicUrl,
      })
      .select()

    if (dbError) {
      console.error("Error creating document record:", dbError)
      // Try to clean up the uploaded file
      await supabase.storage.from("documents").remove([fileName])
      return { success: false, error: dbError.message }
    }

    revalidatePath(`/agent-dashboard/leads/${leadId}`)
    return { success: true, data: data[0], url: publicUrl }
  } catch (error) {
    console.error("Error in uploadDocument:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// READ
export async function getDocumentById(id: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from("documents").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching document:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in getDocumentById:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getDocumentsForLead(leadId: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching documents for lead:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in getDocumentsForLead:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getDocumentsForAgent(agentId: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("documents")
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
      console.error("Error fetching documents for agent:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in getDocumentsForAgent:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// UPDATE
export async function updateDocument(id: string, documentData: Partial<DocumentData>) {
  const supabase = createClient()

  try {
    // Only allow updating certain fields
    const updateData = {
      document_type: documentData.document_type,
    }

    const { error } = await supabase.from("documents").update(updateData).eq("id", id)

    if (error) {
      console.error("Error updating document:", error)
      return { success: false, error: error.message }
    }

    revalidatePath(`/agent-dashboard/leads/${documentData.lead_id}`)
    return { success: true }
  } catch (error) {
    console.error("Error in updateDocument:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// DELETE
export async function deleteDocument(id: string) {
  const supabase = createClient()

  try {
    // First get the document to get the file path and lead ID
    const { data: document, error: fetchError } = await supabase
      .from("documents")
      .select("file_path, lead_id")
      .eq("id", id)
      .single()

    if (fetchError) {
      console.error("Error fetching document:", fetchError)
      return { success: false, error: fetchError.message }
    }

    // Delete the file from storage
    const { error: storageError } = await supabase.storage.from("documents").remove([document.file_path])

    if (storageError) {
      console.error("Error deleting file from storage:", storageError)
      return { success: false, error: storageError.message }
    }

    // Delete the record from the database
    const { error: dbError } = await supabase.from("documents").delete().eq("id", id)

    if (dbError) {
      console.error("Error deleting document record:", dbError)
      return { success: false, error: dbError.message }
    }

    revalidatePath(`/agent-dashboard/leads/${document.lead_id}`)
    return { success: true }
  } catch (error) {
    console.error("Error in deleteDocument:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

