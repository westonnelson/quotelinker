import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="container max-w-3xl py-12 md:py-24">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-6 text-center">
        <div className="rounded-full bg-primary/10 p-3">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Thank You!</h1>
        <p className="text-muted-foreground md:text-xl">
          A licensed agent will contact you shortly to discuss your life insurance options.
        </p>
        <div className="mt-4 rounded-lg border bg-card p-6 shadow-sm w-full">
          <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
          <ul className="space-y-3 text-left">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <span>A licensed agent will call or email you within 24 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <span>They will help you compare quotes from top insurance providers</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <span>You'll receive personalized recommendations based on your needs</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link href="/">
            <Button variant="outline" className="px-8">
              Return Home
            </Button>
          </Link>
          <Link href="/agents">
            <Button className="px-8">Learn About Our Agent Program</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

