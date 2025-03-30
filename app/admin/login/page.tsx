"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { isAdmin } from "@/app/actions/admin-actions"
import { Shield } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Please enter your password",
  }),
})

export default function AdminLoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    // Check if already logged in as admin
    async function checkAuth() {
      const isAdminUser = await isAdmin()
      if (isAdminUser) {
        router.push("/admin/dashboard")
      }
    }

    checkAuth()
  }, [router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) {
        setError("Invalid email or password. Please try again.")
        return
      }

      // Check if the user is an admin
      const isAdminUser = await isAdmin()

      if (!isAdminUser) {
        // Sign out if not an admin
        await supabase.auth.signOut()
        setError("You do not have admin privileges.")
        return
      }

      // Redirect to admin dashboard
      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Error signing in:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-md py-12 md:py-24">
      <div className="mx-auto space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-3">
            <Shield className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Admin Login</h1>
        <p className="text-muted-foreground">Sign in to access the admin dashboard.</p>
      </div>

      {error && (
        <Alert className="mt-6 bg-red-50 text-red-800 border-red-200">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mx-auto mt-8 rounded-lg border bg-card p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="admin@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          <p className="text-muted-foreground">
            <Link href="/" className="text-primary hover:underline">
              Return to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

