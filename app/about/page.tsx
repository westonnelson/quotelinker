import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About Us - QuoteLinker",
  description: "Learn about QuoteLinker's mission and our commitment to connecting you with trusted insurance agents",
}

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About QuoteLinker</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Our mission is to simplify the insurance process and connect you with trusted local agents
        </p>
      </div>

      <div className="mx-auto max-w-4xl mt-12 space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-muted-foreground">
            At QuoteLinker, we believe that finding the right insurance coverage shouldn't be complicated or stressful.
            Our mission is to simplify the insurance process by connecting consumers with trusted, licensed insurance
            agents in their local area who can provide personalized guidance and quotes.
          </p>
          <p className="text-muted-foreground">
            We understand that insurance is not a one-size-fits-all product. Each person's situation is unique, and
            their coverage should reflect their specific needs and circumstances. That's why we focus on creating
            meaningful connections between consumers and agents who can offer tailored solutions.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Who We Are</h2>
          <p className="text-muted-foreground">
            QuoteLinker was founded by a team of insurance industry veterans who recognized the need for a better way to
            connect consumers with quality insurance professionals. With decades of combined experience in insurance
            sales, underwriting, and customer service, our team understands the challenges faced by both consumers
            seeking coverage and agents looking to grow their business.
          </p>
          <p className="text-muted-foreground">
            Our leadership team includes former insurance agents, digital marketing specialists, and technology experts
            who work together to create a platform that benefits both consumers and insurance professionals. We're
            committed to continuous improvement and innovation to make the insurance shopping experience as smooth and
            efficient as possible.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">Trust</h3>
                <p className="text-sm text-muted-foreground">
                  We carefully vet the agents in our network to ensure they are licensed, experienced, and committed to
                  providing excellent service.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  We believe in clear, honest communication about how our service works and how your information will be
                  used.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">Simplicity</h3>
                <p className="text-sm text-muted-foreground">
                  We strive to make the insurance process as simple and stress-free as possible for everyone involved.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <p className="text-muted-foreground">
            QuoteLinker is a free service for consumers. When you submit a quote request through our platform, we
            connect you with a licensed insurance agent in your area who specializes in the type of coverage you're
            looking for. The agent will contact you directly to discuss your needs and provide personalized quotes from
            multiple insurance carriers.
          </p>
          <p className="text-muted-foreground">
            For insurance agents, we provide a steady stream of high-quality leads from consumers actively seeking
            coverage. Our platform helps agents grow their business while focusing on what they do best: providing
            expert guidance and service to their clients.
          </p>
        </div>

        <div className="rounded-lg border p-6 bg-muted/20">
          <h2 className="text-xl font-bold mb-4">Compliance and Disclaimer</h2>
          <p className="text-sm text-muted-foreground mb-2">
            QuoteLinker is not an insurance company, agency, or broker. We do not sell, solicit, or negotiate insurance.
            Our service connects consumers with licensed insurance professionals who can provide quotes and coverage
            options.
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            The information provided on this website is for general informational purposes only and should not be
            considered as professional advice. Always consult with a licensed insurance professional regarding your
            specific insurance needs.
          </p>
          <p className="text-sm text-muted-foreground">
            QuoteLinker is committed to protecting your privacy. We collect personal information solely for the purpose
            of connecting you with insurance agents. Please review our Privacy Policy for more information on how we
            collect, use, and protect your data.
          </p>
        </div>
      </div>
    </div>
  )
}

