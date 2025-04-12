'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import Image from 'next/image'

export default function ThankYouPage() {
  useEffect(() => {
    // Track conversion in GA4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
        'value': 1.0,
        'currency': 'USD'
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 neon-text">
            Thank You for Your Interest!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            We've received your information and would love to discuss your life insurance options.
            Schedule a call with our expert advisors at your convenience.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 neon-border mb-12">
          <div className="calendly-inline-widget" data-url="YOUR_CALENDLY_URL" style={{ minWidth: '320px', height: '700px' }} />
        </div>

        <div className="text-center">
          <p className="text-gray-400">
            Can't make it now? No worries! We'll send you an email with more information about your quote options.
          </p>
        </div>
      </div>

      {/* Calendly Widget Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </div>
  )
} 