"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({
  zip_code: z.string().min(5, { message: "Please enter a valid ZIP code" }),
  insurance_type: z.string(),
})

type LocationInfoFormProps = {
  formData: Record<string, any>
  updateFormData: (data: Record<string, any>) => void
}

export function LocationInfoStep({ formData, updateFormData }: LocationInfoFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      zip_code: formData.zip_code || "",
      insurance_type: formData.insurance_type || "Life Insurance",
    },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    updateFormData(values)
  }

  // Update parent form when values change
  const handleBlur = () => {
    const values = form.getValues()
    updateFormData(values)
  }

  return (
    <div className="space-y-6 px-1">
      <div className="text-center">
        <h3 className="text-lg font-medium">Location & Coverage</h3>
        <p className="text-sm text-muted-foreground">
          Tell us where you're located and what type of insurance you need
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="zip_code"
            render={({ field }) => (
              <FormItem className="form-field">
                <FormLabel>ZIP Code</FormLabel>
                <FormControl>
                  <Input {...field} onBlur={handleBlur} placeholder="12345" className="w-full" />
                </FormControl>
                <FormDescription>We'll use this to match you with local agents</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="form-field">
            <FormLabel>Insurance Type</FormLabel>
            <div className="rounded-md border p-3 mt-1.5 bg-muted/50 w-full">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-primary"></div>
                <span>Life Insurance</span>
              </div>
            </div>
            <FormDescription className="mt-1.5">Currently, we only offer life insurance quotes.</FormDescription>
          </div>
        </form>
      </Form>
    </div>
  )
}

