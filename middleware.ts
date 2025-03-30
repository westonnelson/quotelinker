import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If the user is not signed in and trying to access the dashboard, redirect to login
  if (!session && req.nextUrl.pathname.startsWith("/agent-dashboard")) {
    const redirectUrl = new URL("/agent-login", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If the user is signed in and trying to access login or signup, redirect to dashboard
  if (session && (req.nextUrl.pathname.startsWith("/agent-login") || req.nextUrl.pathname === "/agents")) {
    const redirectUrl = new URL("/agent-dashboard", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Handle admin routes - we'll check for admin role in the layout component
  // This just ensures they're logged in
  if (!session && req.nextUrl.pathname.startsWith("/admin") && req.nextUrl.pathname !== "/admin/login") {
    const redirectUrl = new URL("/admin/login", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/agent-dashboard/:path*", "/agent-login", "/agents", "/admin/:path*"],
}

