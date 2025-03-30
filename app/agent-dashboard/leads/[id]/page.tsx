"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/database.types"
import { markLeadAsContacted } from "@/app/actions/lead-actions"
import { createNote, getNotesForLead, deleteNote } from "@/app/actions/note-actions"
import { uploadDocument, getDocumentsForLead, deleteDocument } from "@/app/actions/document-actions"
import { ArrowLeft, Trash2, FileText, Calendar, Phone, Mail, MapPin } from "lucide-react"

type Lead = Database["public"]["Tables"]["leads"]["Row"]
type Note = Database["public"]["Tables"]["notes"]["Row"]
type Document = Database["public"]["Tables"]["documents"]["Row"]

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [lead, setLead] = useState<Lead | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [noteContent, setNoteContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [documentType, setDocumentType] = useState("Application")
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // Check authentication
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (!session) {
          router.push("/agent-login")
          return
        }

        // Fetch lead details
        const { data: leadData, error: leadError } = await supabase
          .from("leads")
          .select("*")
          .eq("id", params.id)
          .single()

        if (leadError) {
          console.error("Error fetching lead:", leadError)
          router.push("/agent-dashboard")
          return
        }

        setLead(leadData)

        // Fetch notes
        const notesData = await getNotesForLead(params.id)
        setNotes(notesData)

        // Fetch documents
        const documentsData = await getDocumentsForLead(params.id)
        setDocuments(documentsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id, router, supabase])

  async function handleMarkAsContacted() {
    if (!lead) return

    const result = await markLeadAsContacted(lead.id)
    if (result.success) {
      setLead({ ...lead, contacted: true })
    }
  }

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault()
    if (!noteContent.trim() || !lead) return

    setSubmitting(true)

    const formData = new FormData()
    formData.append("lead_id", lead.id)
    formData.append("content", noteContent)

    const result = await createNote(formData)

    if (result.success) {
      // Refresh notes
      const notesData = await getNotesForLead(lead.id)
      setNotes(notesData)
      setNoteContent("")
    }

    setSubmitting(false)
  }

  async function handleDeleteNote(noteId: string) {
    if (!lead) return

    const result = await deleteNote(noteId, lead.id)

    if (result.success) {
      // Update local state
      setNotes(notes.filter((note) => note.id !== noteId))
    }
  }

  async function handleUploadDocument(e: React.FormEvent) {
    e.preventDefault()
    if (!lead) return

    const form = e.target as HTMLFormElement
    const fileInput = form.elements.namedItem("file") as HTMLInputElement

    if (!fileInput.files || fileInput.files.length === 0) return

    setUploading(true)

    const formData = new FormData()
    formData.append("file", fileInput.files[0])
    formData.append("leadId", lead.id)
    formData.append("documentType", documentType)

    const result = await uploadDocument(formData)

    if (result.success) {
      // Refresh documents
      const documentsData = await getDocumentsForLead(lead.id)
      setDocuments(documentsData)
      form.reset()
    }

    setUploading(false)
  }

  async function handleDeleteDocument(documentId: string) {
    if (!lead) return

    const result = await deleteDocument(documentId)

    if (result.success) {
      // Update local state
      setDocuments(documents.filter((doc) => doc.id !== documentId))
    }
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading lead details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <p>Lead not found.</p>
          <Button onClick={() => router.push("/agent-dashboard")} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <Button variant="ghost" className="mb-6 pl-0" onClick={() => router.push("/agent-dashboard")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Lead Information</CardTitle>
              <CardDescription>Contact details and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{lead.full_name}</h3>
                <Badge
                  variant="outline"
                  className={
                    lead.contacted
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                  }
                >
                  {lead.contacted ? "Contacted" : "Pending"}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{lead.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>ZIP: {lead.zip_code}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Added: {new Date(lead.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Insurance Type</h4>
                <div className="rounded-md bg-muted p-2 text-sm">{lead.insurance_type}</div>
              </div>

              {!lead.contacted && (
                <Button className="w-full mt-4" onClick={handleMarkAsContacted}>
                  Mark as Contacted
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="notes">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add Note</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddNote} className="space-y-4">
                    <Textarea
                      placeholder="Enter your notes about this lead here..."
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button type="submit" disabled={submitting || !noteContent.trim()}>
                      {submitting ? "Adding..." : "Add Note"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notes History</CardTitle>
                </CardHeader>
                <CardContent>
                  {notes.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No notes yet. Add your first note above.</p>
                  ) : (
                    <div className="space-y-4">
                      {notes.map((note) => (
                        <div key={note.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="text-sm text-muted-foreground">
                              {new Date(note.created_at).toLocaleString()}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteNote(note.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                          <div className="mt-2 whitespace-pre-wrap">{note.content}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Document</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUploadDocument} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="documentType">Document Type</Label>
                        <select
                          id="documentType"
                          value={documentType}
                          onChange={(e) => setDocumentType(e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="Application">Application</option>
                          <option value="ID Verification">ID Verification</option>
                          <option value="Medical Records">Medical Records</option>
                          <option value="Policy Document">Policy Document</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="file">File</Label>
                        <Input id="file" type="file" name="file" required />
                      </div>
                    </div>
                    <Button type="submit" disabled={uploading}>
                      {uploading ? "Uploading..." : "Upload Document"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  {documents.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No documents uploaded yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between border rounded-lg p-4">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{doc.document_type}</div>
                              <div className="text-sm text-muted-foreground">{doc.file_name}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(doc.created_at).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={doc.public_url} target="_blank" rel="noopener noreferrer">
                                View
                              </a>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

