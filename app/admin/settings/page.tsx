"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const supabase = createClient()

  async function handleSignOut() {
    setIsSigningOut(true)
    try {
      await supabase.auth.signOut()
      router.push("/admin/login")
    } catch (error) {
      console.error("Error signing out:", error)
      setIsSigningOut(false)
    }
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your admin account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">Admin Session</p>
                <p className="text-sm text-muted-foreground">You are currently signed in as an administrator.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={handleSignOut} disabled={isSigningOut}>
                {isSigningOut ? "Signing Out..." : "Sign Out"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>View system information and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">Application</p>
                <p className="text-sm text-muted-foreground">QuoteLinker Admin Dashboard</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Version</p>
                <p className="text-sm text-muted-foreground">1.0.0</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Environment</p>
                <p className="text-sm text-muted-foreground">Production</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

