import type { Metadata } from "next"
import { DynamicQuoteForm } from "@/components/quote-form/dynamic-quote-form"
import { Shield, FileLock, BarChart } from "lucide-react"

export const metadata: Metadata = {
  title: "Life Insurance - QuoteLinker",
  description: "Protect your loved ones' financial future with the right life insurance policy",
}

export default function LifeInsurancePage() {
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
      name: "age",
      label: "Age",
      type: "number" as const,
      placeholder: "35",
      required: true,
    },
    {
      name: "coverage_amount",
      label: "Desired Coverage Amount",
      type: "select" as const,
      options: [
        { value: "100000", label: "$100,000" },
        { value: "250000", label: "$250,000" },
        { value: "500000", label: "$500,000" },
        { value: "1000000", label: "$1,000,000" },
        { value: "2000000", label: "$2,000,000+" },
      ],
      required: true,
    },
    {
      name: "policy_type",
      label: "Policy Type",
      type: "select" as const,
      options: [
        { value: "term", label: "Term Life" },
        { value: "whole", label: "Whole Life" },
        { value: "universal", label: "Universal Life" },
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
                  Life Insurance Coverage
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Protect your loved ones' financial future with the right life insurance policy. Get personalized
                  quotes from top-rated insurers.
                </p>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <DynamicQuoteForm
                insuranceType="Life Insurance"
                fields={quoteFormFields}
                title="Get Your Life Insurance Quote"
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
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Benefits of Life Insurance</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Life insurance provides crucial financial protection for your loved ones
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
                Ensure your family is financially secure if something happens to you
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <FileLock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Debt Coverage</h3>
              <p className="text-muted-foreground">Cover outstanding debts like mortgages, loans, and credit cards</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <BarChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Wealth Building</h3>
              <p className="text-muted-foreground">
                Some policies build cash value that can be used during your lifetime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Life Insurance Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Types of Life Insurance</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Choose the right policy for your needs and budget
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Term Life Insurance</h3>
              <p className="mb-4 text-muted-foreground">
                Provides coverage for a specific period (10, 20, 30 years). Ideal for replacing income during working
                years.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Affordable premiums</li>
                <li>• Simple to understand</li>
                <li>• Fixed death benefit</li>
                <li>• No cash value component</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Whole Life Insurance</h3>
              <p className="mb-4 text-muted-foreground">
                Permanent coverage that lasts your entire life with a cash value component that grows over time.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Lifetime coverage</li>
                <li>• Fixed premiums</li>
                <li>• Builds cash value</li>
                <li>• More expensive than term life</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Universal Life Insurance</h3>
              <p className="mb-4 text-muted-foreground">
                Permanent coverage with flexible premiums and death benefits, plus a cash value component.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Flexible premium payments</li>
                <li>• Adjustable death benefit</li>
                <li>• Cash value grows based on market rates</li>
                <li>• More complex than other types</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Final Expense Insurance</h3>
              <p className="mb-4 text-muted-foreground">
                Small whole life policy designed to cover funeral costs and final expenses.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• No medical exam required</li>
                <li>• Lower coverage amounts</li>
                <li>• Available for seniors</li>
                <li>• Affordable premiums</li>
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
                Common questions about life insurance coverage
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl space-y-4 py-12">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">How much life insurance do I need?</h3>
              <p className="text-muted-foreground">
                A common rule of thumb is 10-15 times your annual income, but this varies based on your debts,
                dependents, and financial goals. Our agents can help you calculate the right amount.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">When is the best time to buy life insurance?</h3>
              <p className="text-muted-foreground">
                Generally, the younger and healthier you are, the lower your premiums will be. Important life events
                like marriage, having children, or buying a home are also good times to consider coverage.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">Do I need a medical exam for life insurance?</h3>
              <p className="text-muted-foreground">
                Many policies require a medical exam, but there are no-exam options available. Keep in mind that no-exam
                policies typically have higher premiums or lower coverage limits.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">Can I have multiple life insurance policies?</h3>
              <p className="text-muted-foreground">
                Yes, you can own multiple life insurance policies from different companies. This can be a strategy to
                layer coverage for different needs and time periods.
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
                  Ready to protect your family's future?
                </h2>
                <p className="md:text-xl">
                  Get connected with a licensed agent today and find the right life insurance coverage for your needs.
                </p>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <DynamicQuoteForm
                insuranceType="Life Insurance"
                fields={quoteFormFields.slice(0, 4)} // Just the basic fields for the CTA form
                title="Get Your Free Quote"
                subtitle="Takes less than 2 minutes"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Related Articles</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">Learn more about life insurance coverage</p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
            <a
              href="/blog/life-insurance-for-young-families"
              className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-bold group-hover:text-primary">Life Insurance for Young Families</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Why young families need life insurance and how to choose the right coverage.
              </p>
              <p className="text-sm font-medium text-primary">Read More →</p>
            </a>
            <a
              href="/blog/term-vs-whole-life-insurance"
              className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-bold group-hover:text-primary">
                Term vs. Whole Life: Which Is Right for You?
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Compare the benefits and drawbacks of term and whole life insurance policies.
              </p>
              <p className="text-sm font-medium text-primary">Read More →</p>
            </a>
            <a
              href="/blog/life-insurance-tax-benefits"
              className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-bold group-hover:text-primary">Tax Benefits of Life Insurance</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Learn about the potential tax advantages of different life insurance policies.
              </p>
              <p className="text-sm font-medium text-primary">Read More →</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

