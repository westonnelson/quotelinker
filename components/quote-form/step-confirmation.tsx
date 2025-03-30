"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"

const schema = z.object({
  privacy_consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy and consent to be contacted",
  }),
})

type ConfirmationFormProps = {
  formData: Record<string, any>
  updateFormData: (data: Record<string, any>) => void
}

export function ConfirmationStep({ formData, updateFormData }: ConfirmationFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      privacy_consent: formData.privacy_consent || false,
    },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    updateFormData(values)
  }

  // Update parent form when values change
  const handleChange = (checked: boolean) => {
    updateFormData({ privacy_consent: checked })
  }

  return (
    <div className="space-y-6 px-1">
      <div className="text-center">
        <h3 className="text-lg font-medium">Confirm Your Information</h3>
        <p className="text-sm text-muted-foreground">Please review your information before submitting</p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="pt-6">
          <dl className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <dt className="font-medium text-muted-foreground">Full Name:</dt>
              <dd className="sm:col-span-2">{formData.full_name}</dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <dt className="font-medium text-muted-foreground">Email:</dt>
              <dd className="sm:col-span-2">{formData.email}</dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <dt className="font-medium text-muted-foreground">Phone:</dt>
              <dd className="sm:col-span-2">{formData.phone}</dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <dt className="font-medium text-muted-foreground">ZIP Code:</dt>
              <dd className="sm:col-span-2">{formData.zip_code}</dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <dt className="font-medium text-muted-foreground">Insurance Type:</dt>
              <dd className="sm:col-span-2">{formData.insurance_type || "Life Insurance"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <div className="rounded-lg border bg-accent/50 p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium">Your information is secure</h4>
            <p className="text-xs text-muted-foreground mt-1">
              We use bank-level encryption to protect your personal information. We never sell your data and only share
              it with the agent you choose to work with.
            </p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="privacy_consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked)
                      handleChange(checked === true)
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I agree to the privacy policy and consent to be contacted</FormLabel>
                  <FormDescription>
                    By checking this box, you agree to our{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      privacy policy
                    </a>{" "}
                    and consent to be contacted by a licensed insurance agent regarding your quote request.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

