"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  getAllLeads,
  getLeadById,
  createLeadRecord,
  updateLeadRecord,
  deleteLeadRecord,
} from "@/app/actions/lead-storage"
import { getNotesForLead, createNote, deleteNote } from "@/app/actions/note-storage"
import { getDocumentsForLead, uploadDocument, deleteDocument } from "@/app/actions/document-storage"
import { useToast } from "@/hooks/use-toast"

export function LeadManagementDemo() {
  const [leads, setLeads] = useState<any[]>([])
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [notes, setNotes] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    zip_code: "",
    insurance_type: "Life Insurance",
    privacy_consent: false,
  })
  const [noteContent, setNoteContent] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState("Application")
  const { toast } = useToast()

  // Load leads on component mount
  useEffect(() => {
    loadLeads()
  }, [])

  // Load lead details when a lead is selected
  useEffect(() => {
    if (selectedLead) {
      loadLeadDetails(selectedLead.id)
    }
  }, [selectedLead])

  // Load all leads
  const loadLeads = async () => {
    setLoading(true)
    try {
      const result = await getAllLeads()
      if (result.success && result.data) {
        setLeads(result.data)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to load leads",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading leads:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Load details for a specific lead
  const loadLeadDetails = async (leadId: string) => {
    setLoading(true)
    try {
      // Load lead details
      const leadResult = await getLeadById(leadId)
      if (leadResult.success && leadResult.data) {
        setSelectedLead(leadResult.data)
      }

      // Load notes
      const notesResult = await getNotesForLead(leadId)
      if (notesResult.success && notesResult.data) {
        setNotes(notesResult.data)
      }

      // Load documents
      const documentsResult = await getDocumentsForLead(leadId)
      if (documentsResult.success && documentsResult.data) {
        setDocuments(documentsResult.data)
      }
    } catch (error) {
      console.error("Error loading lead details:", error)
      toast({
        title: "Error",
        description: "Failed to load lead details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Create a new lead
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await createLeadRecord(formData)
      if (result.success) {
        toast({
          title: "Success",
          description: "Lead created successfully",
        })
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          zip_code: "",
          insurance_type: "Life Insurance",
          privacy_consent: false,
        })
        loadLeads()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create lead",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating lead:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Update a lead
  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedLead) return

    setLoading(true)
    try {
      const result = await updateLeadRecord(selectedLead.id, {
        full_name: selectedLead.full_name,
        email: selectedLead.email,
        phone: selectedLead.phone,
        zip_code: selectedLead.zip_code,
        status: selectedLead.status,
      })

      if (result.success) {
        toast({
          title: "Success",
          description: "Lead updated successfully",
        })
        loadLeads()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update lead",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating lead:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Delete a lead
  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return

    setLoading(true)
    try {
      const result = await deleteLeadRecord(leadId)
      if (result.success) {
        toast({
          title: "Success",
          description: "Lead deleted successfully",
        })
        if (selectedLead?.id === leadId) {
          setSelectedLead(null)
          setNotes([])
          setDocuments([])
        }
        loadLeads()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete lead",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting lead:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Add a note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedLead || !noteContent.trim()) return

    setLoading(true)
    try {
      // In a real app, you'd get the agent ID from the session
      const agentId = "demo-agent-id"

      const result = await createNote({
        lead_id: selectedLead.id,
        agent_id: agentId,
        content: noteContent,
      })

      if (result.success) {
        toast({
          title: "Success",
          description: "Note added successfully",
        })
        setNoteContent("")
        loadLeadDetails(selectedLead.id)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add note",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error adding note:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Delete a note
  const handleDeleteNote = async (noteId: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return

    setLoading(true)
    try {
      const result = await deleteNote(noteId)
      if (result.success) {
        toast({
          title: "Success",
          description: "Note deleted successfully",
        })
        if (selectedLead) {
          loadLeadDetails(selectedLead.id)
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete note",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting note:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  // Upload a document
  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedLead || !file) return

    setLoading(true)
    try {
      // In a real app, you'd get the agent ID from the session
      const agentId = "demo-agent-id"

      const result = await uploadDocument(file, selectedLead.id, agentId, documentType)

      if (result.success) {
        toast({
          title: "Success",
          description: "Document uploaded successfully",
        })
        setFile(null)
        if (selectedLead) {
          loadLeadDetails(selectedLead.id)
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to upload document",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error uploading document:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Delete a document
  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return

    setLoading(true)
    try {
      const result = await deleteDocument(documentId)
      if (result.success) {
        toast({
          title: "Success",
          description: "Document deleted successfully",
        })
        if (selectedLead) {
          loadLeadDetails(selectedLead.id)
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete document",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting document:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Create Lead Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Lead</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateLead} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zip_code">ZIP Code</Label>
              <Input
                id="zip_code"
                value={formData.zip_code}
                onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy_consent"
                checked={formData.privacy_consent}
                onCheckedChange={(checked) => setFormData({ ...formData, privacy_consent: checked === true })}
              />
              <Label htmlFor="privacy_consent">Privacy Consent</Label>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Lead"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lead List */}
      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading...</p>}

          {!loading && leads.length === 0 && <p className="text-muted-foreground">No leads found</p>}

          {!loading && leads.length > 0 && (
            <div className="space-y-2">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3 border rounded-md flex justify-between items-center cursor-pointer hover:bg-accent"
                  onClick={() => setSelectedLead(lead)}
                >
                  <div>
                    <p className="font-medium">{lead.full_name}</p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteLead(lead.id)
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Lead Details */}
      {selectedLead && (
        <>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Lead Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateLead} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit_full_name">Full Name</Label>
                    <Input
                      id="edit_full_name"
                      value={selectedLead.full_name}
                      onChange={(e) => setSelectedLead({ ...selectedLead, full_name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit_email">Email</Label>
                    <Input
                      id="edit_email"
                      type="email"
                      value={selectedLead.email}
                      onChange={(e) => setSelectedLead({ ...selectedLead, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit_phone">Phone</Label>
                    <Input
                      id="edit_phone"
                      value={selectedLead.phone}
                      onChange={(e) => setSelectedLead({ ...selectedLead, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit_zip_code">ZIP Code</Label>
                    <Input
                      id="edit_zip_code"
                      value={selectedLead.zip_code}
                      onChange={(e) => setSelectedLead({ ...selectedLead, zip_code: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit_status">Status</Label>
                    <select
                      id="edit_status"
                      className="w-full p-2 border rounded-md"
                      value={selectedLead.status || "new"}
                      onChange={(e) => setSelectedLead({ ...selectedLead, status: e.target.value })}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="follow_up">Follow Up</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Lead"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddNote} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="note_content">Add Note</Label>
                  <textarea
                    id="note_content"
                    className="w-full p-2 border rounded-md min-h-[100px]"
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Enter your note here..."
                  />
                </div>

                <Button type="submit" disabled={loading || !noteContent.trim()}>
                  {loading ? "Adding..." : "Add Note"}
                </Button>
              </form>

              <div className="mt-4 space-y-3">
                <h3 className="font-medium">Notes History</h3>

                {notes.length === 0 ? (
                  <p className="text-muted-foreground">No notes yet</p>
                ) : (
                  notes.map((note) => (
                    <div key={note.id} className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <p className="text-sm text-muted-foreground">
                          {new Date(note.created_at).toLocaleString()}
                          {note.agent_profiles && ` - ${note.agent_profiles.full_name}`}
                        </p>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteNote(note.id)}>
                          Delete
                        </Button>
                      </div>
                      <p className="mt-1">{note.content}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Documents Section */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUploadDocument} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="document_type">Document Type</Label>
                  <select
                    id="document_type"
                    className="w-full p-2 border rounded-md"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                  >
                    <option value="Application">Application</option>
                    <option value="ID Verification">ID Verification</option>
                    <option value="Medical Records">Medical Records</option>
                    <option value="Policy Document">Policy Document</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document_file">File</Label>
                  <Input id="document_file" type="file" onChange={handleFileChange} />
                </div>

                <Button type="submit" disabled={loading || !file}>
                  {loading ? "Uploading..." : "Upload Document"}
                </Button>
              </form>

              <div className="mt-4 space-y-3">
                <h3 className="font-medium">Documents</h3>

                {documents.length === 0 ? (
                  <p className="text-muted-foreground">No documents yet</p>
                ) : (
                  documents.map((doc) => (
                    <div key={doc.id} className="p-3 border rounded-md flex justify-between items-center">
                      <div>
                        <p className="font-medium">{doc.document_type}</p>
                        <p className="text-sm text-muted-foreground">{doc.file_name}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={doc.public_url} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteDocument(doc.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

