import type { Metadata } from "next"
import { DynamicQuoteForm } from "@/components/quote-form/dynamic-quote-form"
import { Shield, Scale, BadgeDollarSign } from "lucide-react"

export const metadata: Metadata = {
  title: "Auto Insurance - QuoteLinker",
  description: "Find the right car insurance coverage to protect your vehicle and meet your needs",
}

export default function AutoInsurancePage() {
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
      name: "vehicle_make",
      label: "Vehicle Make",
      type: "text" as const,
      placeholder: "Toyota",
      required: true,
    },
    {
      name: "vehicle_model",
      label: "Vehicle Model",
      type: "text" as const,
      placeholder: "Camry",
      required: true,
    },
    {
      name: "vehicle_year",
      label: "Vehicle Year",
      type: "number" as const,
      placeholder: "2020",
      required: true,
    },
    {
      name: "coverage_type",
      label: "Desired Coverage",
      type: "select" as const,
      options: [
        { value: "liability", label: "Liability Only" },
        { value: "collision", label: "Collision" },
        { value: "comprehensive", label: "Comprehensive" },
        { value: "full", label: "Full Coverage" },
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
                  Auto Insurance Coverage
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Protect your vehicle with the right auto insurance policy. Get personalized quotes from top-rated
                  insurers.
                </p>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <DynamicQuoteForm
                insuranceType="Auto Insurance"
                fields={quoteFormFields}
                title="Get Your Auto Insurance Quote"
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
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Benefits of Auto Insurance</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Auto insurance provides crucial protection for you, your vehicle, and others on the road
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Financial Protection</h3>
              <p className="text-muted-foreground">
                Coverage for vehicle damage, medical expenses, and liability claims
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Scale className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Legal Compliance</h3>
              <p className="text-muted-foreground">
                Meet state requirements and avoid fines, license suspension, or vehicle impoundment
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <BadgeDollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Peace of Mind</h3>
              <p className="text-muted-foreground">
                Drive with confidence knowing you're protected against unexpected incidents
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Types Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Types of Auto Insurance Coverage</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Understanding the different types of auto insurance coverage options
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Liability Insurance</h3>
              <p className="mb-4 text-muted-foreground">
                Covers damage you cause to other people's property and injuries you cause to others in an accident.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Required in most states</li>
                <li>• Bodily injury liability</li>
                <li>• Property damage liability</li>
                <li>• Does not cover your vehicle</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Collision Coverage</h3>
              <p className="mb-4 text-muted-foreground">
                Pays for damage to your vehicle caused by a collision with another vehicle or object.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Covers your vehicle repairs</li>
                <li>• Applies regardless of fault</li>
                <li>• Subject to deductible</li>
                <li>• Required for leased or financed vehicles</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Comprehensive Coverage</h3>
              <p className="mb-4 text-muted-foreground">
                Covers damage to your vehicle from non-collision incidents like theft, vandalism, or natural disasters.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Theft and vandalism</li>
                <li>• Weather damage</li>
                <li>• Animal collisions</li>
                <li>• Falling objects</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Additional Coverages</h3>
              <p className="mb-4 text-muted-foreground">
                Optional coverages that provide extra protection for specific situations.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Uninsured/underinsured motorist</li>
                <li>• Medical payments/Personal injury protection</li>
                <li>• Roadside assistance</li>
                <li>• Rental car reimbursement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Common questions about auto insurance coverage
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl space-y-4 py-12">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">How much auto insurance do I need?</h3>
              <p className="text-muted-foreground">
                At minimum, you need your state's required liability coverage. However, we recommend higher limits and
                additional coverages like collision and comprehensive for better protection.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">What affects my auto insurance rates?</h3>
              <p className="text-muted-foreground">
                Factors include your driving record, age, location, vehicle type, credit score, coverage levels,
                deductibles, and available discounts.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">When should I file an auto insurance claim?</h3>
              <p className="text-muted-foreground">
                File a claim for significant damage, any injuries, or when another driver is involved. For minor damage
                that costs less than your deductible, paying out-of-pocket might be better.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">How can I lower my auto insurance premiums?</h3>
              <p className="text-muted-foreground">
                You can bundle policies, maintain a clean driving record, choose a higher deductible, ask about
                discounts, drive a vehicle with safety features, and maintain good credit.
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to get the right auto coverage?
                </h2>
                <p className="md:text-xl">
                  Get connected with a licensed agent today and find the right auto insurance coverage for your needs.
                </p>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <DynamicQuoteForm
                insuranceType="Auto Insurance"
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

