import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://quotelinker.com'),
  title: 'QuoteLinker – Life Insurance Made Easy',
  description: 'Get personalized life insurance quotes in minutes. Compare rates from top providers and find the perfect coverage for your needs.',
  keywords: 'life insurance, insurance quotes, term life insurance, whole life insurance, insurance comparison',
  openGraph: {
    title: 'QuoteLinker – Life Insurance Made Easy',
    description: 'Get personalized life insurance quotes in minutes. Compare rates from top providers and find the perfect coverage for your needs.',
    type: 'website',
    locale: 'en_US',
    siteName: 'QuoteLinker',
    url: 'https://quotelinker.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuoteLinker – Life Insurance Made Easy',
    description: 'Get personalized life insurance quotes in minutes. Compare rates from top providers and find the perfect coverage for your needs.',
  },
  icons: {
    icon: '/images/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
        >
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T3HCQ3QZ');
          `}
        </Script>
        
        {/* HubSpot Tracking Code */}
        <Script
          id="hubspot-tracking"
          strategy="afterInteractive"
        >
          {`
            (function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];
            if(d.getElementById(id))return;js=d.createElement(s);js.id=id;
            js.src="//js.hsforms.net/forms/v2.js";fjs.parentNode.insertBefore(js,fjs);
            })(document,"script","hubspot-forms");
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T3HCQ3QZ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 