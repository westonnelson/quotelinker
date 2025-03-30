"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function uploadDocument(formData: FormData) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return { success: false, error: "Not authenticated" }
  }

  const file = formData.get("file") as File
  const leadId = formData.get("leadId") as string
  const documentType = formData.get("documentType") as string

  if (!file) {
    return { success: false, error: "No file provided" }
  }

  // Create a unique file name
  const fileExt = file.name.split(".").pop()
  const fileName = `${session.user.id}/${leadId}/${documentType}_${Date.now()}.${fileExt}`

  // Upload file to Supabase Storage
  const { error: uploadError } = await supabase.storage.from("documents").upload(fileName, file)

  if (uploadError) {
    return { success: false, error: uploadError.message }
  }

  // Get the public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("documents").getPublicUrl(fileName)

  // Create a record in the documents table (we'll create this table later)
  const { error: dbError } = await supabase.from("documents").insert({
    lead_id: leadId,
    agent_id: session.user.id,
    file_name: file.name,
    file_path: fileName,
    document_type: documentType,
    public_url: publicUrl,
  })

  if (dbError) {
    return { success: false, error: dbError.message }
  }

  revalidatePath("/agent-dashboard/leads")
  return { success: true, url: publicUrl }
}

export async function getDocumentsForLead(leadId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching documents:", error)
    return []
  }

  return data
}

export async function deleteDocument(documentId: string) {
  const supabase = createClient()

  // First get the document to get the file path
  const { data: document, error: fetchError } = await supabase
    .from("documents")
    .select("file_path")
    .eq("id", documentId)
    .single()

  if (fetchError) {
    return { success: false, error: fetchError.message }
  }

  // Delete the file from storage
  const { error: storageError } = await supabase.storage.from("documents").remove([document.file_path])

  if (storageError) {
    return { success: false, error: storageError.message }
  }

  // Delete the record from the database
  const { error: dbError } = await supabase.from("documents").delete().eq("id", documentId)

  if (dbError) {
    return { success: false, error: dbError.message }
  }

  revalidatePath("/agent-dashboard/leads")
  return { success: true }
}

