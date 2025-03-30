import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Users, Clock } from "lucide-react"
import { InsuranceTypesSection } from "@/components/insurance-types-section"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Get Insurance Quotes Fast & Easy
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  We connect you with trusted local agents who can help you find the right coverage for your needs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/get-quote">
                  <Button size="lg" className="px-8">
                    Get Quote
                  </Button>
                </Link>
                <Link href="/agents">
                  <Button size="lg" variant="outline" className="px-8">
                    For Agents
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <div className="rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-background p-8 shadow-lg">
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Why Choose QuoteLinker?</h3>
                  <p className="text-muted-foreground">We make finding the right insurance simple and stress-free.</p>
                </div>
                <div className="mt-6 grid gap-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Fast & Simple</h4>
                      <p className="text-sm text-muted-foreground">Get quotes in minutes, not days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Local Experts</h4>
                      <p className="text-sm text-muted-foreground">Connect with licensed agents in your area</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Trusted Protection</h4>
                      <p className="text-sm text-muted-foreground">Find the right coverage for your family</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Types Section */}
      <InsuranceTypesSection />

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Getting insurance quotes has never been easier
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 md:gap-12">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-bold">Fill Out the Form</h3>
              <p className="text-muted-foreground">Answer a few simple questions about your insurance needs</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-bold">Get Connected</h3>
              <p className="text-muted-foreground">We match you with a licensed agent in your area</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold">Receive Quotes</h3>
              <p className="text-muted-foreground">Compare options and choose the best coverage for your needs</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/get-quote">
              <Button size="lg" className="px-8">
                Get Quote Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Hear from people who have found the right coverage through QuoteLinker
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                "QuoteLinker made finding life insurance so easy. I was connected with a great agent who helped me
                understand my options."
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <h4 className="font-medium">Michael Rodriguez</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                "I was able to get multiple auto insurance quotes and compare them easily. The agent I worked with was
                knowledgeable and helpful."
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <h4 className="font-medium">Jennifer Lee</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                "As a first-time homeowner, I appreciated how simple QuoteLinker made the home insurance process. Highly
                recommend!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Latest Insurance Articles</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Stay informed with our educational resources
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
            <Link href="/blog/life-insurance-for-young-families" className="group">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Life Insurance for Young Families"
                  width={400}
                  height={200}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Jun 12, 2023 • Life Insurance</p>
                <h3 className="mt-1 text-lg font-bold group-hover:text-primary">Life Insurance for Young Families</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Why young families need life insurance and how to choose the right coverage.
                </p>
              </div>
            </Link>
            <Link href="/blog/home-insurance-mistakes" className="group">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="5 Common Home Insurance Mistakes"
                  width={400}
                  height={200}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">May 28, 2023 • Home Insurance</p>
                <h3 className="mt-1 text-lg font-bold group-hover:text-primary">5 Common Home Insurance Mistakes</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Avoid these common pitfalls when purchasing homeowners insurance.
                </p>
              </div>
            </Link>
            <Link href="/blog/comparing-auto-insurance" className="group">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="How to Compare Auto Insurance Quotes"
                  width={400}
                  height={200}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Apr 17, 2023 • Auto Insurance</p>
                <h3 className="mt-1 text-lg font-bold group-hover:text-primary">
                  How to Compare Auto Insurance Quotes
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tips for understanding and comparing auto insurance quotes to find the best coverage.
                </p>
              </div>
            </Link>
          </div>
          <div className="flex justify-center">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="rounded-xl text-primary-foreground">
            <div className="grid gap-6 p-8 md:p-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to get started?</h2>
                <p className="text-primary-foreground/90 md:text-xl">
                  Get connected with a trusted local agent today and find the right insurance coverage for your needs.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 lg:justify-end">
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/get-quote">
                    <Button size="lg" variant="secondary" className="px-8">
                      Get Quote
                    </Button>
                  </Link>
                  <Link href="/agents">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8"
                    >
                      For Agents
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

