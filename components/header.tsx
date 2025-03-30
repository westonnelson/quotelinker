"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const insuranceTypes = [
    { label: "Life Insurance", href: "/insurance/life" },
    { label: "Auto Insurance", href: "/insurance/auto" },
    { label: "Home Insurance", href: "/insurance/home" },
    { label: "Health Insurance", href: "/insurance/health" },
  ]

  const resourceTypes = [
    { label: "Blog", href: "/blog" },
    { label: "Webinars", href: "/resources/webinars" },
    { label: "Insurance Guide", href: "/resources/insurance-guide" },
  ]

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Insurance", href: "#", dropdown: insuranceTypes },
    { label: "Resources", href: "#", dropdown: resourceTypes },
    { label: "For Agents", href: "/agents" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) =>
            item.dropdown ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                      pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {item.label} <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {item.dropdown.map((dropdownItem) => (
                    <DropdownMenuItem key={dropdownItem.href} asChild>
                      <Link
                        href={dropdownItem.href}
                        className={cn(pathname === dropdownItem.href ? "text-primary" : "")}
                      >
                        {dropdownItem.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/agent-login">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Agent Login
            </Button>
          </Link>
          <Link href="/get-quote" className="hidden md:block">
            <Button size="sm">Get Quote</Button>
          </Link>

          {/* Always visible "For Agents" button on mobile */}
          <Link href="/agents" className="md:hidden">
            <Button variant="outline" size="sm">
              For Agents
            </Button>
          </Link>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t absolute top-16 left-0 right-0 bg-background z-50 shadow-md">
          <div className="container py-4 space-y-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div key={item.label} className="space-y-2">
                    <div className="font-medium px-2 py-1">{item.label}</div>
                    <div className="pl-4 space-y-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className={cn(
                            "block px-2 py-1 text-sm rounded-md transition-colors",
                            pathname === dropdownItem.href
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-2 py-1 text-sm font-medium rounded-md transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <Link href="/agent-login" className="mt-2" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Agent Login
                </Button>
              </Link>
              <Link href="/get-quote" className="mt-2" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Get Quote</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

