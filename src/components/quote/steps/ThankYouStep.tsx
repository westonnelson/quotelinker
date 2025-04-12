'use client'

import { useQuote } from '@/context/QuoteContext'
import Link from 'next/link'
import { FaCheckCircle, FaEnvelope, FaPhone } from 'react-icons/fa'

export default function ThankYouStep() {
  const { state } = useQuote()
  const { formData } = state

  return (
    <div className="max-w-md mx-auto px-4 py-8 text-center">
      <div className="mb-8">
        <FaCheckCircle className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
        <p className="text-gray-600">
          We've received your information and will be in touch shortly with your personalized quote.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <FaEnvelope className="w-5 h-5 text-primary-600" />
            <span className="text-gray-600">
              Check your email at {formData.email} for your quote
            </span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <FaPhone className="w-5 h-5 text-primary-600" />
            <span className="text-gray-600">
              A licensed agent will call you at {formData.phone}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Link href="/" className="btn-primary block">
          Return to Homepage
        </Link>
        <Link href="/learn-more" className="btn-secondary block">
          Learn More About Life Insurance
        </Link>
      </div>
    </div>
  )
} 