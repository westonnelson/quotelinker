"use client"

import { useState, useEffect } from "react"
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
import { Input } from "@/components/ui/input"
import { getAllAgentsWithStats, deleteAgent } from "@/app/actions/admin-actions"
import { MoreHorizontal, Search, Trash2, AlertCircle } from "lucide-react"

type AgentWithStats = {
  id: string
  full_name: string
  agency_name: string
  email: string
  phone: string
  states_licensed: string[]
  lines_of_insurance: string[]
  custom_package_request: boolean
  created_at: string
  stats: {
    totalLeads: number
    contactedLeads: number
    pendingLeads: number
  }
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<AgentWithStats[]>([])
  const [filteredAgents, setFilteredAgents] = useState<AgentWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [agentToDelete, setAgentToDelete] = useState<AgentWithStats | null>(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    async function fetchAgents() {
      setLoading(true)
      try {
        const { success, data, error } = await getAllAgentsWithStats()

        if (success && data) {
          setAgents(data)
          setFilteredAgents(data)
        } else {
          console.error("Error fetching agents:", error)
        }
      } catch (error) {
        console.error("Error fetching agents:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAgents(agents)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = agents.filter(
        (agent) =>
          agent.full_name.toLowerCase().includes(query) ||
          agent.agency_name.toLowerCase().includes(query) ||
          agent.email.toLowerCase().includes(query),
      )
      setFilteredAgents(filtered)
    }
  }, [searchQuery, agents])

  async function handleDeleteAgent() {
    if (!agentToDelete) return

    setIsDeleting(true)
    try {
      const result = await deleteAgent(agentToDelete.id, null)

      if (result.success) {
        // Remove the agent from the list
        setAgents(agents.filter((agent) => agent.id !== agentToDelete.id))
        setFilteredAgents(filteredAgents.filter((agent) => agent.id !== agentToDelete.id))
        setConfirmDeleteOpen(false)
      } else {
        console.error("Error deleting agent:", result.error)
      }
    } catch (error) {
      console.error("Error deleting agent:", error)
    } finally {
      setIsDeleting(false)
      setAgentToDelete(null)
    }
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Agents Management</h2>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search agents..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Agents</CardTitle>
          <CardDescription>Manage agent accounts and their assigned leads</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredAgents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No agents found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>States</TableHead>
                  <TableHead className="text-center">Total Leads</TableHead>
                  <TableHead className="text-center">Contacted</TableHead>
                  <TableHead className="text-center">Pending</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="font-medium">{agent.full_name}</div>
                      <div className="text-sm text-muted-foreground">{agent.agency_name}</div>
                    </TableCell>
                    <TableCell>
                      <div>{agent.email}</div>
                      <div className="text-sm text-muted-foreground">{agent.phone}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {agent.states_licensed.slice(0, 2).map((state) => (
                          <span
                            key={state}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                          >
                            {state}
                          </span>
                        ))}
                        {agent.states_licensed.length > 2 && (
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                            +{agent.states_licensed.length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{agent.stats.totalLeads}</TableCell>
                    <TableCell className="text-center">{agent.stats.contactedLeads}</TableCell>
                    <TableCell className="text-center">{agent.stats.pendingLeads}</TableCell>
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
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setAgentToDelete(agent)
                              setConfirmDeleteOpen(true)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Agent
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

      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Confirm Agent Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {agentToDelete?.full_name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              This agent has <strong>{agentToDelete?.stats.totalLeads || 0}</strong> leads assigned to them. These leads
              will be unassigned and will need to be manually reassigned to other agents.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAgent} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Agent"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

