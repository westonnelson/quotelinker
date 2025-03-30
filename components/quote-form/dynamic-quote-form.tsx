"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { createLead } from "@/app/actions/lead-actions"

export type FormFieldType = {
  name: string
  label: string
  type: "text" | "email" | "tel" | "select" | "checkbox" | "number" | "date"
  placeholder?: string
  description?: string
  options?: { value: string; label: string }[]
  required?: boolean
  validation?: {
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    pattern?: RegExp
  }
}

type DynamicQuoteFormProps = {
  insuranceType: string
  fields: FormFieldType[]
  title?: string
  subtitle?: string
  buttonText?: string
  includePrivacyConsent?: boolean
}

export function DynamicQuoteForm({
  insuranceType,
  fields,
  title = "Get a Quote",
  subtitle = "Fill out the form below to get started",
  buttonText = "Get Quote",
  includePrivacyConsent = true,
}: DynamicQuoteFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Dynamically build the schema based on fields
  const buildSchema = () => {
    const schemaFields: Record<string, any> = {}

    fields.forEach((field) => {
      let validator: any = z.string()

      if (field.required) {
        validator = validator.min(1, { message: `${field.label} is required` })
      } else {
        validator = validator.optional()
      }

      if (field.type === "email") {
        validator = z.string().email({ message: "Please enter a valid email address" })
        if (!field.required) validator = validator.optional()
      }

      if (field.type === "tel") {
        validator = z.string().min(10, { message: "Please enter a valid phone number" })
        if (!field.required) validator = validator.optional()
      }

      if (field.validation?.minLength) {
        validator = validator.min(field.validation.minLength, {
          message: `${field.label} must be at least ${field.validation.minLength} characters`,
        })
      }

      if (field.validation?.maxLength) {
        validator = validator.max(field.validation.maxLength, {
          message: `${field.label} must be at most ${field.validation.maxLength} characters`,
        })
      }

      if (field.validation?.pattern) {
        validator = validator.regex(field.validation.pattern, {
          message: `${field.label} is not in the correct format`,
        })
      }

      if (field.type === "number") {
        validator = z.preprocess(
          (val) => (val === "" ? undefined : Number(val)),
          z.number({ invalid_type_error: `${field.label} must be a number` }),
        )

        // Remove the min/max validation that's causing issues
        if (!field.required) validator = validator.optional()
      }

      if (field.type === "checkbox") {
        validator = z.boolean().optional()
      }

      schemaFields[field.name] = validator
    })

    if (includePrivacyConsent) {
      schemaFields.privacy_consent = z.boolean().refine((val) => val === true, {
        message: "You must agree to the privacy policy",
      })
    }

    return z.object(schemaFields)
  }

  const formSchema = buildSchema()
  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce((acc, field) => {
      if (field.type === "checkbox") {
        acc[field.name] = false
      } else {
        acc[field.name] = ""
      }
      return acc
    }, {} as any),
  })

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      // Add the insurance type to the form data
      const formData = new FormData()

      // Add all form values to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString())
        }
      })

      // Add the insurance type
      formData.append("insurance_type", insuranceType)

      const result = await createLead(formData)

      if (result.success) {
        router.push("/thank-you")
      } else {
        console.error("Error submitting form:", result.error)
        form.setError("root", {
          type: "manual",
          message: result.error || "An error occurred while submitting the form. Please try again.",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      form.setError("root", {
        type: "manual",
        message: "An error occurred while submitting the form. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as any}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "select" ? (
                        <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                          <SelectTrigger>
                            <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === "checkbox" ? (
                        <Checkbox checked={formField.value as boolean} onCheckedChange={formField.onChange} />
                      ) : (
                        <Input {...formField} type={field.type} placeholder={field.placeholder} />
                      )}
                    </FormControl>
                    {field.description && <FormDescription>{field.description}</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {includePrivacyConsent && (
              <FormField
                control={form.control}
                name="privacy_consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I agree to the privacy policy and consent to be contacted</FormLabel>
                      <FormDescription>
                        By checking this box, you agree to our{" "}
                        <a href="/privacy" className="text-primary hover:underline">
                          privacy policy
                        </a>{" "}
                        and consent to be contacted by a licensed insurance agent.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            )}

            {form.formState.errors.root && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                buttonText
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

