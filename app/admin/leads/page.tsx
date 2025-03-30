"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getAllLeads, getAllAgentsWithStats, assignLeadToAgent, deleteLead } from "@/app/actions/admin-actions"
import { MoreHorizontal, Search, Trash2, AlertCircle, UserPlus } from "lucide-react"

type Lead = {
  id: string
  full_name: string
  email: string
  phone: string
  zip_code: string
  insurance_type: string
  created_at: string
  assigned_to: string | null
  contacted: boolean
  agent_profiles?: {
    full_name: string
    agency_name: string
  } | null
}

type Agent = {
  id: string
  full_name: string
  agency_name: string
}

export default function LeadsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null)
  const [leadToAssign, setLeadToAssign] = useState<Lead | null>(null)
  const [selectedAgentId, setSelectedAgentId] = useState<string>("")
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Check for filter in URL
    const filter = searchParams.get("filter")
    if (filter === "unassigned") {
      setStatusFilter("unassigned")
    }
  }, [searchParams])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // Fetch leads
        const leadsResult = await getAllLeads()

        if (leadsResult.success && leadsResult.data) {
          setLeads(leadsResult.data)
        } else {
          console.error("Error fetching leads:", leadsResult.error)
        }

        // Fetch agents
        const agentsResult = await getAllAgentsWithStats()

        if (agentsResult.success && agentsResult.data) {
          setAgents(agentsResult.data)
        } else {
          console.error("Error fetching agents:", agentsResult.error)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    filterLeads()
  }, [searchQuery, statusFilter, leads])

  function filterLeads() {
    let filtered = [...leads]

    // Apply status filter
    if (statusFilter === "contacted") {
      filtered = filtered.filter((lead) => lead.contacted)
    } else if (statusFilter === "pending") {
      filtered = filtered.filter((lead) => !lead.contacted)
    } else if (statusFilter === "assigned") {
      filtered = filtered.filter((lead) => lead.assigned_to !== null)
    } else if (statusFilter === "unassigned") {
      filtered = filtered.filter((lead) => lead.assigned_to === null)
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (lead) =>
          lead.full_name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.phone.toLowerCase().includes(query) ||
          lead.zip_code.includes(query),
      )
    }

    setFilteredLeads(filtered)
  }

  async function handleDeleteLead() {
    if (!leadToDelete) return

    setIsProcessing(true)
    try {
      const result = await deleteLead(leadToDelete.id)

      if (result.success) {
        // Remove the lead from the list
        setLeads(leads.filter((lead) => lead.id !== leadToDelete.id))
        setConfirmDeleteOpen(false)
      } else {
        console.error("Error deleting lead:", result.error)
      }
    } catch (error) {
      console.error("Error deleting lead:", error)
    } finally {
      setIsProcessing(false)
      setLeadToDelete(null)
    }
  }

  async function handleAssignLead() {
    if (!leadToAssign || !selectedAgentId) return

    setIsProcessing(true)
    try {
      const result = await assignLeadToAgent(leadToAssign.id, selectedAgentId)

      if (result.success) {
        // Update the lead in the list
        setLeads(
          leads.map((lead) => {
            if (lead.id === leadToAssign.id) {
              const assignedAgent = agents.find((agent) => agent.id === selectedAgentId)
              return {
                ...lead,
                assigned_to: selectedAgentId,
                agent_profiles: assignedAgent
                  ? {
                      full_name: assignedAgent.full_name,
                      agency_name: assignedAgent.agency_name,
                    }
                  : null,
              }
            }
            return lead
          }),
        )
        setAssignDialogOpen(false)
      } else {
        console.error("Error assigning lead:", result.error)
      }
    } catch (error) {
      console.error("Error assigning lead:", error)
    } finally {
      setIsProcessing(false)
      setLeadToAssign(null)
      setSelectedAgentId("")
    }
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Leads Management</h2>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leads..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Leads</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>Manage leads and assign them to agents</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No leads found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.full_name}</TableCell>
                    <TableCell>
                      <div>{lead.email}</div>
                      <div className="text-sm text-muted-foreground">{lead.phone}</div>
                    </TableCell>
                    <TableCell>{lead.zip_code}</TableCell>
                    <TableCell>
                      {lead.contacted ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Contacted
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {lead.agent_profiles ? (
                        <div>
                          <div>{lead.agent_profiles.full_name}</div>
                          <div className="text-xs text-muted-foreground">{lead.agent_profiles.agency_name}</div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setLeadToAssign(lead)
                              setSelectedAgentId(lead.assigned_to || "")
                              setAssignDialogOpen(true)
                            }}
                          >
                            <UserPlus className="mr-2 h-4 w-4" />
                            {lead.assigned_to ? "Reassign Lead" : "Assign Lead"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setLeadToDelete(lead)
                              setConfirmDeleteOpen(true)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Lead
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Lead Dialog */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Confirm Lead Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {leadToDelete?.full_name}'s lead? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteLead} disabled={isProcessing}>
              {isProcessing ? "Deleting..." : "Delete Lead"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Lead Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{leadToAssign?.assigned_to ? "Reassign Lead" : "Assign Lead"}</DialogTitle>
            <DialogDescription>
              {leadToAssign?.assigned_to
                ? "Select a new agent to handle this lead."
                : "Assign this lead to an agent to handle the follow-up."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Lead Information</h3>
                <p className="text-sm">
                  {leadToAssign?.full_name} - {leadToAssign?.email}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="agent">Select Agent</Label>
                <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.full_name} - {agent.agency_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={handleAssignLead} disabled={isProcessing}>
              {isProcessing ? "Assigning..." : "Assign Lead"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

