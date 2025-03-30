"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/database.types"
import { updateLeadStatus } from "@/app/actions/lead-actions"
import {
  User,
  FileText,
  Search,
  CheckCircle,
  PhoneForwarded,
  MoreHorizontal,
  Clock,
  ArrowRightCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react"

type Lead = Database["public"]["Tables"]["leads"]["Row"] & {
  status?: string
}

type AgentProfile = Database["public"]["Tables"]["agent_profiles"]["Row"]

export default function AgentDashboardPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [profile, setProfile] = useState<AgentProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const supabase = createClient()

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/agent-login")
        return
      }

      fetchAgentData(session.user.id)
    }

    checkAuth()
  }, [router, supabase])

  async function fetchAgentData(userId: string) {
    setLoading(true)

    try {
      // Fetch agent profile
      const { data: profileData, error: profileError } = await supabase
        .from("agent_profiles")
        .select("*")
        .eq("id", userId)
        .single()

      if (profileError) {
        console.error("Error fetching profile:", profileError)
        return
      }

      setProfile(profileData)

      // Fetch leads assigned to this agent
      const { data: leadsData, error: leadsError } = await supabase
        .from("leads")
        .select("*")
        .eq("assigned_to", userId)
        .order("created_at", { ascending: false })

      if (leadsError) {
        console.error("Error fetching leads:", leadsError)
        return
      }

      setLeads(leadsData || [])
      setFilteredLeads(leadsData || [])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push("/agent-login")
  }

  async function handleUpdateLeadStatus(leadId: string, status: string) {
    try {
      const result = await updateLeadStatus(leadId, status)

      if (result.success) {
        // Update local state
        setLeads(
          leads.map((lead) => (lead.id === leadId ? { ...lead, status: status, contacted: status !== "new" } : lead)),
        )
        setFilteredLeads(
          filteredLeads.map((lead) =>
            lead.id === leadId ? { ...lead, status: status, contacted: status !== "new" } : lead,
          ),
        )
      }
    } catch (error) {
      console.error("Error updating lead:", error)
    }
  }

  // Filter leads based on search query and tab
  useEffect(() => {
    let filtered = [...leads]

    // Filter by tab
    if (activeTab === "new") {
      filtered = filtered.filter((lead) => !lead.contacted)
    } else if (activeTab === "contacted") {
      filtered = filtered.filter((lead) => lead.contacted && lead.status === "contacted")
    } else if (activeTab === "follow_up") {
      filtered = filtered.filter((lead) => lead.status === "follow_up")
    } else if (activeTab === "closed") {
      filtered = filtered.filter((lead) => lead.status === "closed")
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (lead) =>
          lead.full_name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.zip_code.toLowerCase().includes(query),
      )
    }

    setFilteredLeads(filtered)
  }, [searchQuery, activeTab, leads])

  // Get counts for each category
  const newLeadsCount = leads.filter((lead) => !lead.contacted).length
  const contactedLeadsCount = leads.filter((lead) => lead.contacted && lead.status === "contacted").length
  const followUpLeadsCount = leads.filter((lead) => lead.status === "follow_up").length
  const closedLeadsCount = leads.filter((lead) => lead.status === "closed").length

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Agent Dashboard</h1>
          {profile && (
            <p className="text-muted-foreground">
              Welcome back, {profile.full_name} | {profile.agency_name}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/agent-dashboard/profile">
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Button>
          </Link>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card className={activeTab === "all" ? "border-primary bg-primary/5" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{leads.length}</div>
            <Button variant="ghost" className="mt-2 p-0 h-auto text-xs font-medium" onClick={() => setActiveTab("all")}>
              View All
            </Button>
          </CardContent>
        </Card>
        <Card className={activeTab === "new" ? "border-primary bg-primary/5" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{newLeadsCount}</div>
            <Button variant="ghost" className="mt-2 p-0 h-auto text-xs font-medium" onClick={() => setActiveTab("new")}>
              View New
            </Button>
          </CardContent>
        </Card>
        <Card className={activeTab === "contacted" || activeTab === "follow_up" ? "border-primary bg-primary/5" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{contactedLeadsCount + followUpLeadsCount}</div>
            <div className="flex gap-2 mt-2">
              <Button
                variant="ghost"
                className="p-0 h-auto text-xs font-medium"
                onClick={() => setActiveTab("contacted")}
              >
                Contacted ({contactedLeadsCount})
              </Button>
              <Button
                variant="ghost"
                className="p-0 h-auto text-xs font-medium"
                onClick={() => setActiveTab("follow_up")}
              >
                Follow Up ({followUpLeadsCount})
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className={activeTab === "closed" ? "border-primary bg-primary/5" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{closedLeadsCount}</div>
            <Button
              variant="ghost"
              className="mt-2 p-0 h-auto text-xs font-medium"
              onClick={() => setActiveTab("closed")}
            >
              View Closed
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="space-y-0 pb-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div>
              <CardTitle>Your Leads</CardTitle>
              <CardDescription>Manage and track your assigned leads</CardDescription>
            </div>
            <div className="w-full max-w-xs relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="all">All Leads</TabsTrigger>
              <TabsTrigger value="new" className="relative">
                New
                {newLeadsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                    {newLeadsCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="contacted">Contacted</TabsTrigger>
              <TabsTrigger value="follow_up">Follow-Up</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No leads found.</p>
              {searchQuery && (
                <Button variant="ghost" className="mt-2" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y">
              {filteredLeads.map((lead) => (
                <div key={lead.id} className="p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{lead.full_name}</h3>
                        <GetLeadStatusBadge status={lead.status} contacted={lead.contacted} />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>ZIP: {lead.zip_code}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/agent-dashboard/leads/${lead.id}`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          <span>Details</span>
                        </Button>
                      </Link>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <span className="mr-1">Status</span>
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleUpdateLeadStatus(lead.id, "new")} className="gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Mark as New</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpdateLeadStatus(lead.id, "contacted")}
                            className="gap-2"
                          >
                            <PhoneForwarded className="h-4 w-4" />
                            <span>Mark as Contacted</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpdateLeadStatus(lead.id, "follow_up")}
                            className="gap-2"
                          >
                            <ArrowRightCircle className="h-4 w-4" />
                            <span>Mark for Follow-Up</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateLeadStatus(lead.id, "closed")} className="gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>Mark as Closed</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function GetLeadStatusBadge({ status, contacted }: { status?: string; contacted: boolean }) {
  if (status === "closed") {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        Closed
      </Badge>
    )
  }

  if (status === "follow_up") {
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        Follow-Up
      </Badge>
    )
  }

  if (contacted || status === "contacted") {
    return (
      <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
        Contacted
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
      New
    </Badge>
  )
}

