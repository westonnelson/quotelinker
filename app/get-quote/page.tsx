"use client"
import { MultiStepForm } from "@/components/quote-form/multi-step-form"
import { PersonalInfoStep } from "@/components/quote-form/step-personal-info"
import { LocationInfoStep } from "@/components/quote-form/step-location-info"
import { ConfirmationStep } from "@/components/quote-form/step-confirmation"
import { createLead } from "@/app/actions/lead-actions"

export default function GetQuotePage() {
  const steps = [
    {
      title: "Personal Info",
      content: PersonalInfoStep,
    },
    {
      title: "Location",
      content: LocationInfoStep,
    },
    {
      title: "Confirm",
      content: ConfirmationStep,
    },
  ]

  const handleSubmit = async (formData: FormData) => {
    try {
      // Submit the lead
      const result = await createLead(formData)

      if (result.success) {
        return true
      }

      console.error("Error submitting form:", result.error)
      return false
    } catch (error) {
      console.error("Error submitting form:", error)
      return false
    }
  }

  return (
    <div className="container max-w-3xl py-8 md:py-16 px-4 sm:px-6">
      <div className="mx-auto space-y-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">Get Life Insurance Quote</h1>
        <p className="mx-auto max-w-[600px] text-muted-foreground sm:text-lg">
          Fill out the form below to get connected with a trusted local agent who can help you find the right coverage.
        </p>
      </div>

      <div className="mx-auto mt-8 sm:mt-12 soft-gradient-card p-4 sm:p-6 md:p-8">
        <MultiStepForm
          steps={steps}
          onSubmit={handleSubmit}
          initialData={{
            insurance_type: "Life Insurance",
          }}
        />

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Your information is secure. We never sell your data.</p>
        </div>
      </div>
    </div>
  )
}

