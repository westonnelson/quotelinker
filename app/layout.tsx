import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QuoteLinker - Life Insurance Lead Generation",
  description: "Connect with trusted local agents for life insurance quotes",
  metadataBase: new URL("https://quotelinker.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quotelinker.com",
    title: "QuoteLinker - Insurance Lead Generation",
    description: "Connect with trusted local agents for insurance quotes",
    siteName: "QuoteLinker",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QuoteLinker - Insurance Lead Generation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuoteLinker - Insurance Lead Generation",
    description: "Connect with trusted local agents for insurance quotes",
    images: ["/images/og-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'