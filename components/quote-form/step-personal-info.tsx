"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({
  full_name: z.string().min(2, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
})

type PersonalInfoFormProps = {
  formData: Record<string, any>
  updateFormData: (data: Record<string, any>) => void
}

export function PersonalInfoStep({ formData, updateFormData }: PersonalInfoFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: formData.full_name || "",
      email: formData.email || "",
      phone: formData.phone || "",
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
        <h3 className="text-lg font-medium">Personal Information</h3>
        <p className="text-sm text-muted-foreground">Let's start with your contact information</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem className="form-field">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} onBlur={handleBlur} placeholder="John Doe" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="form-field">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onBlur={handleBlur}
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="form-field">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} onBlur={handleBlur} type="tel" placeholder="(555) 123-4567" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

