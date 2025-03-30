"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { createLead } from "@/app/actions/lead-actions"
import { FileDown, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  full_name: z.string().min(2, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  zip_code: z.string().min(5, { message: "Please enter a valid ZIP code" }),
  privacy_consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
})

export default function InsuranceGuideClientPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      zip_code: "",
      privacy_consent: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()

      // Add form values
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value.toString())
      })

      // Add resource type
      formData.append("lead_source", "insurance_guide_download")
      formData.append("insurance_type", "General")

      // In a real app, this would send the form data to a server
      // For now, we'll simulate a successful submission after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const result = await createLead(formData)

      if (result.success) {
        setIsSubmitted(true)
        form.reset()
      } else {
        setError(result.error || "An error occurred. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              The Ultimate Insurance Guide
            </h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Our comprehensive guide to understanding insurance coverage and finding the best rates for your needs.
            </p>

            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-bold">What You'll Learn:</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>How to determine the right coverage amounts for your situation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Tips for comparing insurance quotes effectively</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Common insurance terms and what they mean</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Strategies for lowering your insurance premiums</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>How to avoid common insurance pitfalls</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <img
                src="/images/insurance-guide-preview.jpg"
                alt="Insurance Guide Preview"
                className="rounded-lg border shadow-md"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                }}
              />
            </div>
          </div>

          <div>
            {isSubmitted ? (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h2 className="text-xl font-bold text-green-800">Thank You!</h2>
                  </div>
                  <p className="text-green-700">
                    Your guide is ready to download. We've also sent a copy to your email for future reference.
                  </p>
                  <Button className="w-full" asChild>
                    <a href="/resources/ultimate-insurance-guide.pdf" download>
                      <FileDown className="mr-2 h-4 w-4" />
                      Download Guide
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Download Free Guide</h2>
                  <p className="text-muted-foreground mb-6">
                    Fill out the form to get instant access to our insurance guide
                  </p>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
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
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zip_code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="12345" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="privacy_consent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>I agree to the privacy policy</FormLabel>
                              <FormDescription>
                                We'll use your information to send you the guide and occasional insurance tips.
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      {error && (
                        <Alert variant="destructive">
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Get Free Guide"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

