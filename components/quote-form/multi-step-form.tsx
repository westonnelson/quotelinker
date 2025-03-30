"use client"

import { type ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = {
  title: string
  content: ReactNode
}

type MultiStepFormProps = {
  steps: Step[]
  onSubmit: (data: FormData) => Promise<boolean>
  initialData?: Record<string, any>
}

export function MultiStepForm({ steps, onSubmit, initialData = {} }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const router = useRouter()

  // Form data handling
  const updateFormData = (newData: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  // Step navigation
  const nextStep = () => {
    // Validate current step
    if (currentStep === steps.length - 1) {
      // Final step validation
      if (!formData.privacy_consent) {
        setValidationErrors(["You must agree to the privacy policy to continue"])
        return
      }
    }

    setValidationErrors([])
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    setValidationErrors([])
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  // Form submission
  const handleSubmit = async () => {
    // Final validation before submission
    if (!formData.privacy_consent) {
      setValidationErrors(["You must agree to the privacy policy to continue"])
      return
    }

    try {
      setIsSubmitting(true)
      setValidationErrors([])

      // Convert to FormData
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataObj.append(key, value.toString())
        }
      })

      const success = await onSubmit(formDataObj)

      if (success) {
        router.push("/thank-you")
      } else {
        setValidationErrors(["There was an error submitting your form. Please try again."])
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setValidationErrors(["There was an error submitting your form. Please try again."])
    } finally {
      setIsSubmitting(false)
    }
  }

  // Dynamic step content
  const StepContent = () => {
    const CurrentStepContent = steps[currentStep].content
    return (
      <div className="step-content">
        {typeof CurrentStepContent === "function"
          ? CurrentStepContent({ formData, updateFormData })
          : CurrentStepContent}
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Step Indicator */}
      <div className="step-indicator overflow-x-auto pb-2">
        <div className="flex min-w-max">
          {steps.map((step, index) => (
            <div key={index} className="step-indicator-item flex-1 min-w-[100px]">
              {index > 0 && (
                <div
                  className={cn(
                    "absolute top-4 -left-1/2 w-full h-1",
                    index <= currentStep ? "bg-primary" : "bg-muted",
                  )}
                ></div>
              )}
              <div
                className={cn(
                  "step-indicator-bubble",
                  index === currentStep && "active",
                  index < currentStep && "completed",
                )}
              >
                {index < currentStep ? <CheckIcon className="h-4 w-4" /> : index + 1}
              </div>
              <div
                className={cn(
                  "step-indicator-label",
                  index === currentStep && "active",
                  index < currentStep && "completed",
                )}
              >
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="w-full">
        <StepContent />
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          <ul className="list-disc pl-5">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0 || isSubmitting}
          className="w-full sm:w-auto"
        >
          Back
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button type="button" onClick={nextStep} className="w-full sm:w-auto">
            Continue
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        )}
      </div>
    </div>
  )
}

