import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Insurance FAQ - QuoteLinker",
  description: "Find answers to common insurance questions and learn more about different types of coverage",
}

export default function FAQPage() {
  const faqs = [
    {
      category: "Life Insurance",
      questions: [
        {
          question: "How much life insurance do I need?",
          answer:
            "The amount of life insurance you need depends on several factors, including your income, debts, dependents, and financial goals. A common rule of thumb is to have coverage equal to 10-15 times your annual income. However, your specific situation may require more or less. Consider your mortgage, other debts, future education expenses for children, and income replacement needs when calculating the right amount.",
        },
        {
          question: "What's the difference between term and whole life insurance?",
          answer:
            "Term life insurance provides coverage for a specific period (typically 10, 20, or 30 years) and pays a death benefit if you die during the term. It's generally more affordable but has no cash value component. Whole life insurance provides lifetime coverage with fixed premiums and includes a cash value component that grows over time. While more expensive, whole life offers permanent protection and can be used as a financial tool for cash accumulation.",
        },
        {
          question: "At what age should I buy life insurance?",
          answer:
            "Generally, the younger you are when you purchase life insurance, the lower your premiums will be. Many financial advisors recommend buying life insurance in your 20s or 30s, especially if you have dependents or debt. Key life events that often trigger the need for life insurance include marriage, buying a home, or having children. However, it's never too late to get coverage if you have people who depend on you financially.",
        },
      ],
    },
    {
      category: "Auto Insurance",
      questions: [
        {
          question: "What factors affect my auto insurance rates?",
          answer:
            "Many factors influence your auto insurance rates, including your driving record, age, location, vehicle type, credit score (in most states), annual mileage, coverage levels, and deductibles. Insurance companies also consider your claims history, marital status, and sometimes your occupation. Shopping around and comparing quotes from multiple insurers can help you find the best rates for your specific situation.",
        },
        {
          question: "Is liability coverage enough, or do I need comprehensive and collision?",
          answer:
            "While liability coverage is legally required in most states, it only covers damage you cause to others and their property. If you want protection for your own vehicle, you'll need comprehensive (for non-collision incidents like theft, vandalism, or natural disasters) and collision coverage (for accidents regardless of fault). If your vehicle is newer or of significant value, comprehensive and collision are generally recommended. For older vehicles worth less than $4,000, you might consider dropping these coverages.",
        },
      ],
    },
    {
      category: "Home Insurance",
      questions: [
        {
          question: "Does homeowners insurance cover flooding?",
          answer:
            "Standard homeowners insurance policies typically do not cover flood damage. For flood protection, you'll need a separate flood insurance policy, usually through the National Flood Insurance Program (NFIP) or a private insurer. Even if you don't live in a high-risk flood zone, consider that about 20% of flood claims come from properties in low to moderate-risk areas. Flood insurance covers both the structure of your home and your belongings from flood damage.",
        },
        {
          question: "How do I determine the right coverage amount for my home?",
          answer:
            "Your home should be insured for its replacement cost—what it would cost to rebuild your home from scratch with similar materials and quality—not its market value. Market value includes land value and is influenced by location and real estate trends. To determine replacement cost, consider your home's square footage, construction materials, special features, and local building costs. Many insurers offer tools to help calculate this, or you can hire a professional appraiser.",
        },
      ],
    },
    {
      category: "Health Insurance",
      questions: [
        {
          question: "What's the difference between an HMO and PPO health plan?",
          answer:
            "An HMO (Health Maintenance Organization) typically requires you to select a primary care physician and get referrals to see specialists. HMOs generally have lower premiums and out-of-pocket costs but limit you to in-network providers. A PPO (Preferred Provider Organization) offers more flexibility in choosing doctors and hospitals, both in-network and out-of-network, without requiring referrals. PPOs typically have higher premiums and out-of-pocket costs but provide more provider choice.",
        },
        {
          question: "What is a health insurance deductible, and how does it work?",
          answer:
            "A health insurance deductible is the amount you pay for covered healthcare services before your insurance plan starts to pay. For example, with a $2,000 deductible, you pay the first $2,000 of covered services yourself. After you meet your deductible, you usually pay only a copayment or coinsurance for covered services, and your insurance pays the rest. Plans with lower deductibles generally have higher monthly premiums, while plans with higher deductibles typically have lower premiums.",
        },
      ],
    },
    {
      category: "General Insurance Questions",
      questions: [
        {
          question: "How can I lower my insurance premiums?",
          answer:
            "There are several ways to lower your insurance premiums: 1) Bundle multiple policies with the same insurer, 2) Maintain a good driving record and credit score, 3) Choose a higher deductible, 4) Ask about available discounts (safe driver, good student, home security features, etc.), 5) Review and update your coverage regularly to avoid paying for unnecessary protection, 6) Consider usage-based insurance programs if you're a safe driver or don't drive much, and 7) Shop around and compare quotes from multiple insurers every 1-2 years.",
        },
        {
          question: "What should I do if my insurance claim is denied?",
          answer:
            "If your insurance claim is denied, first carefully review the denial letter to understand the reason. Then, check your policy to verify coverage details. Contact your insurance company to discuss the denial and ask for clarification. If you believe the denial is incorrect, file a formal appeal following your insurer's process. Document everything and provide additional evidence supporting your claim. If necessary, file a complaint with your state's insurance department or consult an attorney specializing in insurance claims. Many claim denials are overturned upon appeal when properly addressed.",
        },
      ],
    },
  ]

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Insurance FAQ</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Find answers to common insurance questions and learn more about different types of coverage
        </p>
      </div>

      <div className="mx-auto max-w-4xl mt-12 space-y-12">
        {faqs.map((category, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl font-bold">{category.category}</h2>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        <Card className="bg-muted/20 border">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-bold">Still have questions?</h2>
              <p className="text-muted-foreground">
                Our team is here to help you find the right insurance coverage for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link href="/contact">
                  <Button variant="outline">Contact Us</Button>
                </Link>
                <Link href="/get-quote">
                  <Button>Get a Quote</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

