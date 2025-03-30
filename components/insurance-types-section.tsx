import type React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Car, Home, Heart, Stethoscope } from "lucide-react"

type InsuranceTypeProps = {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

const InsuranceType = ({ icon, title, description, href }: InsuranceTypeProps) => (
  <Link href={href} className="block no-underline">
    <Card className="h-full transition-all hover:shadow-md">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </Link>
)

export function InsuranceTypesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Insurance Solutions</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Find the right coverage to protect what matters most to you
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          <InsuranceType
            icon={<Heart className="h-8 w-8" />}
            title="Life Insurance"
            description="Protect your family's financial future"
            href="/insurance/life"
          />
          <InsuranceType
            icon={<Car className="h-8 w-8" />}
            title="Auto Insurance"
            description="Coverage for your vehicle and liability"
            href="/insurance/auto"
          />
          <InsuranceType
            icon={<Home className="h-8 w-8" />}
            title="Home Insurance"
            description="Protect your home and belongings"
            href="/insurance/home"
          />
          <InsuranceType
            icon={<Stethoscope className="h-8 w-8" />}
            title="Health Insurance"
            description="Take care of your health needs"
            href="/insurance/health"
          />
        </div>
      </div>
    </section>
  )
}

