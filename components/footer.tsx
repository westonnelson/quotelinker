import Link from "next/link"
import { Logo } from "@/components/logo"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-accent/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Connecting you with trusted local agents for your life insurance needs.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-2 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground link-hover">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground link-hover">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground link-hover">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/get-quote" className="text-muted-foreground link-hover">
                    Get a Quote
                  </Link>
                </li>
                <li>
                  <Link href="/agents" className="text-muted-foreground link-hover">
                    For Agents
                  </Link>
                </li>
                <li>
                  <Link href="/agent-login" className="text-muted-foreground link-hover">
                    Agent Login
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-muted-foreground link-hover">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground link-hover">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} QuoteLinker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

