import type { Metadata } from "next"
import { DynamicQuoteForm } from "@/components/quote-form/dynamic-quote-form"
import { Home, Umbrella, Wrench, Briefcase } from "lucide-react"

export const metadata: Metadata = {
  title: "Home Insurance - QuoteLinker",
  description: "Protect your home and belongings with the right homeowners insurance policy",
}

export default function HomeInsurancePage() {
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
      name: "home_type",
      label: "Home Type",
      type: "select" as const,
      options: [
        { value: "single_family", label: "Single-Family Home" },
        { value: "condo", label: "Condo" },
        { value: "townhouse", label: "Townhouse" },
        { value: "mobile_home", label: "Mobile Home" },
        { value: "multi_family", label: "Multi-Family Home" },
      ],
      required: true,
    },
    {
      name: "home_value",
      label: "Estimated Home Value",
      type: "select" as const,
      options: [
        { value: "under_200k", label: "Under $200,000" },
        { value: "200k_300k", label: "$200,000 - $300,000" },
        { value: "300k_400k", label: "$300,000 - $400,000" },
        { value: "400k_500k", label: "$400,000 - $500,000" },
        { value: "500k_750k", label: "$500,000 - $750,000" },
        { value: "750k_1m", label: "$750,000 - $1,000,000" },
        { value: "over_1m", label: "Over $1,000,000" },
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
                  Home Insurance Coverage
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Protect your most valuable asset with comprehensive home insurance. Get personalized quotes from
                  top-rated insurers.
                </p>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <DynamicQuoteForm
                insuranceType="Home Insurance"
                fields={quoteFormFields}
                title="Get Your Home Insurance Quote"
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
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Benefits of Home Insurance</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Home insurance provides crucial protection for your property and financial wellbeing
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Property Protection</h3>
              <p className="text-muted-foreground">Coverage for your home's structure and your personal belongings</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Umbrella className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Liability Coverage</h3>
              <p className="text-muted-foreground">
                Protection if someone is injured on your property or you damage others' property
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Mortgage Requirement</h3>
              <p className="text-muted-foreground">Meet lender requirements and protect your investment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Types Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Home Insurance Covers</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Understanding the different aspects of your homeowners insurance policy
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Dwelling Coverage</h3>
              <p className="mb-4 text-muted-foreground">
                Protects the physical structure of your home, including attached structures like a garage or deck.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Foundation, walls, and roof</li>
                <li>• Built-in appliances</li>
                <li>• Electrical, plumbing, and HVAC systems</li>
                <li>• Attached structures</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Personal Property</h3>
              <p className="mb-4 text-muted-foreground">
                Covers your belongings inside and outside your home, such as furniture, clothing, and electronics.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Furniture and appliances</li>
                <li>• Electronics and valuables</li>
                <li>• Clothing and personal items</li>
                <li>• Usually 50-70% of dwelling coverage</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Liability Protection</h3>
              <p className="mb-4 text-muted-foreground">
                Covers legal and medical costs if someone is injured on your property or you damage someone else's
                property.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Medical payments for guests</li>
                <li>• Legal defense costs</li>
                <li>• Property damage you cause to others</li>
                <li>• Dog bite liability (varies by policy)</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Additional Coverages</h3>
              <p className="mb-4 text-muted-foreground">
                Other protections included in most standard home insurance policies.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Additional living expenses</li>
                <li>• Other structures on property</li>
                <li>• Loss of use coverage</li>
                <li>• Limited coverage for specific valuables</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Perils Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Covered Perils</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Common causes of loss that are typically covered by home insurance
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-x-12 gap-y-6 py-12 md:grid-cols-3">
            <div className="space-y-1">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Fire & Smoke</h3>
            </div>
            <div className="space-y-1">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Wind & Hail</h3>
            </div>
            <div className="space-y-1">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Lightning Strikes</h3>
            </div>
            <div className="space-y-1">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Vandalism</h3>
            </div>
            <div className="space-y-1">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Theft</h3>
            </div>
            <div className="space-y-1">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Falling Objects</h3>
            </div>
            <div className="space-y-1">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Water Damage</h3>
            </div>
            <div className="space-y-1">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Explosions</h3>
            </div>
            <div className="space-y-1">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-medium">Vehicle Damage</h3>
            </div>
          </div>
          <div className="mx-auto max-w-3xl rounded-lg border bg-amber-50 p-6 text-amber-900">
            <h3 className="mb-2 font-bold">Common Exclusions</h3>
            <p className="text-sm">
              Standard home insurance typically does not cover flood damage, earthquake damage, normal wear and tear,
              pest damage, or intentional damage. Additional coverage may be available for some exclusions.
            </p>
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
                Common questions about home insurance coverage
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl space-y-4 py-12">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">How much home insurance do I need?</h3>
              <p className="text-muted-foreground">
                You should have enough dwelling coverage to rebuild your home completely in case of a total loss.
                Personal property coverage should be enough to replace all your belongings.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">
                What's the difference between replacement cost and actual cash value?
              </h3>
              <p className="text-muted-foreground">
                Replacement cost coverage pays to replace your items with new ones, while actual cash value covers the
                depreciated value of your items. Replacement cost provides better coverage but typically costs more.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">Do I need flood insurance?</h3>
              <p className="text-muted-foreground">
                Standard home insurance doesn't cover flood damage. If you live in a flood-prone area or want extra
                protection, you should consider a separate flood insurance policy through the National Flood Insurance
                Program (NFIP) or a private insurer.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">What factors affect my home insurance rates?</h3>
              <p className="text-muted-foreground">
                Factors include your home's age, construction, location, claims history, proximity to fire stations,
                security features, credit score, and chosen coverage amounts and deductibles.
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Protect your home today</h2>
                <p className="md:text-xl">
                  Get connected with a licensed agent to find the right home insurance coverage for your needs.
                </p>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <DynamicQuoteForm
                insuranceType="Home Insurance"
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

