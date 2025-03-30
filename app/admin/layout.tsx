import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { isAdmin } from "@/app/actions/admin-actions"
import AdminSidebar from "@/components/admin-sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  // Check if user is authenticated and is an admin
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  // Check if the user has admin role
  const adminCheck = await isAdmin()

  if (!adminCheck) {
    // Sign out and redirect if not an admin
    await supabase.auth.signOut()
    redirect("/admin/login")
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <main className="flex flex-col">{children}</main>
    </div>
  )
}

