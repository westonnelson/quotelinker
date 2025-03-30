"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { Shield, Users, DollarSign, BarChart } from "lucide-react"

const formSchema = z.object({
  full_name: z.string().min(2, {
    message: "Please enter your full name",
  }),
  agency_name: z.string().min(2, {
    message: "Please enter your agency name",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
  states_licensed: z.array(z.string()).min(1, {
    message: "Please select at least one state",
  }),
  lines_of_insurance: z.array(z.string()).min(1, {
    message: "Please select at least one line of insurance",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  custom_package_request: z.boolean().default(false),
})

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

const INSURANCE_TYPES = [
  "Life Insurance",
  "Health Insurance",
  "Auto Insurance",
  "Home Insurance",
  "Business Insurance",
  "Disability Insurance",
  "Long-Term Care Insurance",
]

export default function AgentsPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      agency_name: "",
      email: "",
      phone: "",
      states_licensed: [],
      lines_of_insurance: [],
      password: "",
      custom_package_request: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      })

      if (authError) {
        console.error("Error creating account:", authError)
        return
      }

      if (authData.user) {
        // Create agent profile
        const { error: profileError } = await supabase.from("agent_profiles").insert({
          id: authData.user.id,
          full_name: values.full_name,
          agency_name: values.agency_name,
          email: values.email,
          phone: values.phone,
          states_licensed: values.states_licensed,
          lines_of_insurance: values.lines_of_insurance,
          custom_package_request: values.custom_package_request,
        })

        if (profileError) {
          console.error("Error creating profile:", profileError)
          return
        }

        // Sign out the user after registration
        await supabase.auth.signOut()

        // Redirect to success page
        router.push("/agent-login?registered=true")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto space-y-6 text-center max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Agent Network</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Connect with potential clients and grow your business with QuoteLinker's lead generation platform.
        </p>
      </div>

      <div className="grid gap-12 py-12 md:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Why Partner With Us?</h2>
            <p className="text-muted-foreground">
              QuoteLinker helps you connect with clients looking for life insurance coverage in your area.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Qualified Leads</h3>
                <p className="text-sm text-muted-foreground">
                  Receive leads from consumers actively seeking life insurance quotes in your licensed states.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Exclusive Territories</h3>
                <p className="text-sm text-muted-foreground">
                  Get exclusive access to leads in your geographic area with our territory protection.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Flexible Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from various lead packages or request a custom solution for your agency.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <BarChart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Performance Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Track your leads, conversions, and ROI with our easy-to-use agent dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="font-medium">Lead Packages</h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span>Starter Package</span>
                <span className="font-medium">10 leads/month</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Growth Package</span>
                <span className="font-medium">25 leads/month</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Premium Package</span>
                <span className="font-medium">50 leads/month</span>
              </div>
              <div className="flex justify-between">
                <span>Enterprise Package</span>
                <span className="font-medium">Custom</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Agent Sign-Up Form</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agency_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agency Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe Insurance Agency" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="states_licensed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>States Licensed</FormLabel>
                    <Select onValueChange={(value) => field.onChange([...field.value, value])}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select states" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {US_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {field.value.map((state) => (
                        <div
                          key={state}
                          className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
                        >
                          <span>{state}</span>
                          <button
                            type="button"
                            onClick={() => field.onChange(field.value.filter((s) => s !== state))}
                            className="ml-1 rounded-full hover:bg-primary/20 h-4 w-4 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lines_of_insurance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lines of Insurance</FormLabel>
                    <div className="space-y-2">
                      {INSURANCE_TYPES.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={field.value.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, type])
                              } else {
                                field.onChange(field.value.filter((value) => value !== type))
                              }
                            }}
                          />
                          <label
                            htmlFor={type}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
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
                    <FormDescription>Must be at least 8 characters long</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="custom_package_request"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I'm interested in a custom lead package</FormLabel>
                      <FormDescription>Our team will contact you to discuss custom options</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Create Agent Account"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

