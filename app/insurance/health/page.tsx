import type { Metadata } from "next"
import { DynamicQuoteForm } from "@/components/quote-form/dynamic-quote-form"
import { Heart, Hospital, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Health Insurance - QuoteLinker",
  description: "Find the right health insurance coverage for you and your family",
}

export default function HealthInsurancePage() {
  const quoteFormFields = [
    {
      name: "full_name",
      label: "Full Name",
      type: "text" as const,
      placeholder: "John Doe",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email" as const,
      placeholder: "john@example.com",
      required: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel" as const,
      placeholder: "(555) 123-4567",
      required: true,
    },
    {
      name: "zip_code",
      label: "ZIP Code",
      type: "text" as const,
      placeholder: "12345",
      required: true,
    },
    {
      name: "household_size",
      label: "Household Size",
      type: "select" as const,
      options: [
        { value: "1", label: "1 Person" },
        { value: "2", label: "2 People" },
        { value: "3", label: "3 People" },
        { value: "4", label: "4 People" },
        { value: "5", label: "5+ People" },
      ],
      required: true,
    },
    {
      name: "coverage_needs",
      label: "Coverage Needs",
      type: "select" as const,
      options: [
        { value: "basic", label: "Basic Coverage" },
        { value: "standard", label: "Standard Coverage" },
        { value: "premium", label: "Premium Coverage" },
        { value: "not_sure", label: "Not Sure" },
      ],
      required: true,
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Health Insurance Coverage
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Find the right health insurance plan for you and your family. Get personalized quotes from top
                  insurance providers.
                </p>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <DynamicQuoteForm
                insuranceType="Health Insurance"
                fields={quoteFormFields}
                title="Get Your Health Insurance Quote"
                subtitle="Fill out this form for personalized quotes from top carriers"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Benefits of Health Insurance</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Health insurance provides essential protection for you and your family's wellbeing
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Preventive Care</h3>
              <p className="text-muted-foreground">
                Access to free preventive services like vaccinations and screenings
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Hospital className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Financial Protection</h3>
              <p className="text-muted-foreground">Coverage for major medical expenses and emergencies</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Peace of Mind</h3>
              <p className="text-muted-foreground">Security in knowing you're covered for unexpected health issues</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Types Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Types of Health Insurance Plans</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Understanding the different types of health insurance coverage options
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Health Maintenance Organization (HMO)</h3>
              <p className="mb-4 text-muted-foreground">
                A plan that typically requires you to select a primary care physician and get referrals to see
                specialists.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Lower premiums and out-of-pocket costs</li>
                <li>• Limited to in-network providers</li>
                <li>• Requires referrals for specialists</li>
                <li>• Less paperwork for claims</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Preferred Provider Organization (PPO)</h3>
              <p className="mb-4 text-muted-foreground">
                A plan that offers more flexibility in choosing doctors and hospitals, both in-network and
                out-of-network.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• More provider choice</li>
                <li>• No primary care physician requirement</li>
                <li>• No referrals needed for specialists</li>
                <li>• Higher premiums and out-of-pocket costs</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Exclusive Provider Organization (EPO)</h3>
              <p className="mb-4 text-muted-foreground">
                A hybrid plan that combines aspects of both HMO and PPO plans.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• No coverage for out-of-network providers</li>
                <li>• No primary care physician requirement</li>
                <li>• Typically no referrals needed</li>
                <li>• Lower premiums than PPO plans</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">High-Deductible Health Plan (HDHP)</h3>
              <p className="mb-4 text-muted-foreground">
                A plan with a higher deductible and lower premium, often paired with a Health Savings Account (HSA).
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Lower monthly premiums</li>
                <li>• Higher deductibles</li>
                <li>• HSA-eligible for tax advantages</li>
                <li>• Good for generally healthy people</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Health Insurance Covers</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Essential health benefits typically covered by health insurance plans
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Preventive Care</h3>
                  <p className="text-sm text-muted-foreground">Annual check-ups, screenings, and vaccinations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Emergency Services</h3>
                  <p className="text-sm text-muted-foreground">ER visits and ambulance services</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Hospitalization</h3>
                  <p className="text-sm text-muted-foreground">Surgery and overnight stays</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Prescription Drugs</h3>
                  <p className="text-sm text-muted-foreground">Medications prescribed by your doctor</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Laboratory Services</h3>
                  <p className="text-sm text-muted-foreground">Blood tests, X-rays, and other tests</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Maternity and Newborn Care</h3>
                  <p className="text-sm text-muted-foreground">Pregnancy and childbirth services</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Mental Health Services</h3>
                  <p className="text-sm text-muted-foreground">Behavioral health treatment and counseling</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Rehabilitative Services</h3>
                  <p className="text-sm text-muted-foreground">Physical therapy and medical equipment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Common questions about health insurance coverage
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl space-y-4 py-12">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">
                What is the difference between a deductible, copay, and coinsurance?
              </h3>
              <p className="text-muted-foreground">
                A deductible is the amount you pay before insurance kicks in. A copay is a fixed amount you pay for a
                service. Coinsurance is the percentage you pay for covered services after meeting your deductible.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">Can I purchase health insurance outside of open enrollment?</h3>
              <p className="text-muted-foreground">
                You can enroll in health insurance outside of open enrollment if you experience a qualifying life event
                like marriage, having a baby, or losing existing coverage. This creates a special enrollment period.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">What is an HSA and how does it work?</h3>
              <p className="text-muted-foreground">
                A Health Savings Account (HSA) is a tax-advantaged account for people with high-deductible health plans.
                You can use HSA funds to pay for qualified medical expenses tax-free, and unused funds roll over year to
                year.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">Are pre-existing conditions covered?</h3>
              <p className="text-muted-foreground">
                Under the Affordable Care Act, health insurance plans cannot deny coverage or charge more because of
                pre-existing conditions. All marketplace plans must cover pre-existing health conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Protect your health today</h2>
                <p className="md:text-xl">
                  Get connected with a licensed agent to find the right health insurance coverage for your needs.
                </p>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <DynamicQuoteForm
                insuranceType="Health Insurance"
                fields={quoteFormFields.slice(0, 4)} // Just the basic fields for the CTA form
                title="Get Your Free Quote"
                subtitle="Takes less than 2 minutes"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

