"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { getAgentProfile, updateAgentProfile } from "@/app/actions/agent-actions"
import { ArrowLeft } from "lucide-react"

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

const personalInfoSchema = z.object({
  full_name: z.string().min(2, {
    message: "Please enter your full name",
  }),
  agency_name: z.string().min(2, {
    message: "Please enter your agency name",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})

const professionalInfoSchema = z.object({
  states_licensed: z.array(z.string()).min(1, {
    message: "Please select at least one state",
  }),
  lines_of_insurance: z.array(z.string()).min(1, {
    message: "Please select at least one line of insurance",
  }),
  custom_package_request: z.boolean().default(false),
})

const notificationSchema = z.object({
  notification_preferences: z.object({
    email_new_leads: z.boolean().default(true),
    email_lead_updates: z.boolean().default(true),
    sms_new_leads: z.boolean().default(false),
    sms_lead_updates: z.boolean().default(false),
  }),
})

export default function AgentProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const personalForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      full_name: "",
      agency_name: "",
      phone: "",
      email: "",
    },
  })

  const professionalForm = useForm<z.infer<typeof professionalInfoSchema>>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      states_licensed: [],
      lines_of_insurance: [],
      custom_package_request: false,
    },
  })

  const notificationForm = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      notification_preferences: {
        email_new_leads: true,
        email_lead_updates: true,
        sms_new_leads: false,
        sms_lead_updates: false,
      },
    },
  })

  useEffect(() => {
    async function fetchProfile() {
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

        // Fetch agent profile
        const profile = await getAgentProfile()

        if (profile) {
          personalForm.reset({
            full_name: profile.full_name,
            agency_name: profile.agency_name,
            phone: profile.phone,
            email: profile.email,
          })

          professionalForm.reset({
            states_licensed: profile.states_licensed,
            lines_of_insurance: profile.lines_of_insurance,
            custom_package_request: profile.custom_package_request,
          })

          const defaultNotificationPrefs = {
            email_new_leads: true,
            email_lead_updates: true,
            sms_new_leads: false,
            sms_lead_updates: false,
          }

          notificationForm.reset({
            notification_preferences: profile.notification_preferences || defaultNotificationPrefs,
          })
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [personalForm, professionalForm, notificationForm, router, supabase])

  async function onSubmitPersonal(values: z.infer<typeof personalInfoSchema>) {
    await saveProfile({ ...values })
  }

  async function onSubmitProfessional(values: z.infer<typeof professionalInfoSchema>) {
    await saveProfile({ ...values })
  }

  async function onSubmitNotifications(values: z.infer<typeof notificationSchema>) {
    await saveProfile({ ...values })
  }

  async function saveProfile(values: any) {
    setIsSubmitting(true)
    setSuccess(false)

    try {
      const formData = new FormData()

      // Add all form values to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (key === "states_licensed" || key === "lines_of_insurance") {
          // Handle arrays
          if (Array.isArray(value)) {
            ;(value as string[]).forEach((item) => {
              formData.append(key, item)
            })
          }
        } else if (key === "notification_preferences") {
          // Handle JSON objects
          formData.append(key, JSON.stringify(value))
        } else if (value !== undefined) {
          // Handle regular values
          formData.append(key, value as string)
        }
      })

      const result = await updateAgentProfile(formData)

      if (result.success) {
        setSuccess(true)

        // Set a timeout to clear the success message
        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your profile...</p>
          </div>
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

      <Card>
        <CardHeader>
          <CardTitle>Agent Profile</CardTitle>
          <CardDescription>Update your profile information and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
              Your profile has been updated successfully!
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 pt-4">
              <Form {...personalForm}>
                <form onSubmit={personalForm.handleSubmit(onSubmitPersonal)} className="space-y-4">
                  <FormField
                    control={personalForm.control}
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
                    control={personalForm.control}
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
                    control={personalForm.control}
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
                    control={personalForm.control}
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

                  <Button type="submit" className="mt-2" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="professional" className="space-y-4 pt-4">
              <Form {...professionalForm}>
                <form onSubmit={professionalForm.handleSubmit(onSubmitProfessional)} className="space-y-4">
                  <FormField
                    control={professionalForm.control}
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
                    control={professionalForm.control}
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
                    control={professionalForm.control}
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

                  <Button type="submit" className="mt-2" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 pt-4">
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onSubmitNotifications)} className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>

                    <FormField
                      control={notificationForm.control}
                      name="notification_preferences.email_new_leads"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Email me when new leads are assigned</FormLabel>
                            <FormDescription>Get notified whenever a new lead is assigned to you</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="notification_preferences.email_lead_updates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Email me with lead status updates</FormLabel>
                            <FormDescription>Get notified when the status of your leads changes</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">SMS Notifications</h3>

                    <FormField
                      control={notificationForm.control}
                      name="notification_preferences.sms_new_leads"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Text me when new leads are assigned</FormLabel>
                            <FormDescription>Get SMS notifications for new leads</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="notification_preferences.sms_lead_updates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Text me with lead status updates</FormLabel>
                            <FormDescription>Get SMS notifications when lead status changes</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="mt-2" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Notification Preferences"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

