import Link from 'next/link'
import Image from 'next/image'
import MultiStepForm from '@/components/MultiStepForm'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 neon-text">
                Life Insurance Made Simple
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Get personalized life insurance quotes from top providers in minutes. 
                No complicated forms, no hassle - just straightforward coverage for you and your loved ones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#quote-form" className="btn-primary text-center">
                  Get Your Quote Now
                </Link>
                <Link href="#how-it-works" className="btn-secondary text-center">
                  Learn More
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-300">Fast & Easy</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-300">Best Rates</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-300">No Obligation</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-300">Expert Support</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative h-96 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="h-64 w-64 text-indigo-500 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quote Form Section */}
      <section id="quote-form" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 neon-text">
              Get Your Personalized Quote
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Answer a few simple questions to get matched with the best life insurance options for your needs.
              It only takes about 2 minutes to complete.
            </p>
          </div>
          
          <MultiStepForm />
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 neon-text">
              How QuoteLinker Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We've simplified the process of finding the right life insurance coverage for you and your family.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card neon-border">
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-600 rounded-full p-4 mb-4">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">1. Answer Simple Questions</h3>
                <p className="text-gray-300">
                  Complete our easy-to-use form with basic information about yourself and your insurance needs.
                </p>
              </div>
            </div>
            
            <div className="card neon-border">
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-600 rounded-full p-4 mb-4">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">2. Compare Top Providers</h3>
                <p className="text-gray-300">
                  We'll match you with the best life insurance providers based on your specific needs and profile.
                </p>
              </div>
            </div>
            
            <div className="card neon-border">
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-600 rounded-full p-4 mb-4">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">3. Get Your Coverage</h3>
                <p className="text-gray-300">
                  Choose the best option for you and get covered quickly with our streamlined application process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section id="benefits" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 neon-text">
              Why Choose QuoteLinker
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're committed to making life insurance simple, transparent, and accessible for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Save Time</h3>
                <p className="mt-2 text-gray-300">
                  Get quotes from multiple providers in minutes instead of filling out separate applications for each.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Save Money</h3>
                <p className="mt-2 text-gray-300">
                  Compare rates from top providers to find the best coverage at the most competitive price.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Expert Guidance</h3>
                <p className="mt-2 text-gray-300">
                  Our licensed insurance experts are here to help you understand your options and make the best choice.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Secure & Confidential</h3>
                <p className="mt-2 text-gray-300">
                  Your information is protected with bank-level security and never shared without your permission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 neon-text">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about life insurance and our quote process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card neon-border">
              <h3 className="text-lg font-medium text-white mb-2">What is life insurance?</h3>
              <p className="text-gray-300">
                Life insurance is a contract between you and an insurance company that provides a death benefit to your beneficiaries when you pass away. This financial protection helps ensure your loved ones are taken care of after you're gone.
              </p>
            </div>
            
            <div className="card neon-border">
              <h3 className="text-lg font-medium text-white mb-2">How much coverage do I need?</h3>
              <p className="text-gray-300">
                The amount of coverage you need depends on your financial obligations, income, and goals for your beneficiaries. A common rule of thumb is 10-15 times your annual income, but our experts can help you determine the right amount for your situation.
              </p>
            </div>
            
            <div className="card neon-border">
              <h3 className="text-lg font-medium text-white mb-2">What types of life insurance are available?</h3>
              <p className="text-gray-300">
                The main types are term life (coverage for a specific period), whole life (permanent coverage with cash value), and universal life (flexible permanent coverage). Term life is typically the most affordable option for most people.
              </p>
            </div>
            
            <div className="card neon-border">
              <h3 className="text-lg font-medium text-white mb-2">How does the quote process work?</h3>
              <p className="text-gray-300">
                Simply answer a few questions about yourself and your insurance needs. We'll match you with the best providers and coverage options. You can then compare quotes and choose the one that works best for you.
              </p>
            </div>
            
            <div className="card neon-border">
              <h3 className="text-lg font-medium text-white mb-2">Is my information secure?</h3>
              <p className="text-gray-300">
                Yes, we use bank-level encryption to protect your personal information. Your data is never shared with third parties without your explicit consent, and we adhere to strict privacy standards.
              </p>
            </div>
            
            <div className="card neon-border">
              <h3 className="text-lg font-medium text-white mb-2">Do I need to speak with an agent?</h3>
              <p className="text-gray-300">
                While you can complete the entire process online, our licensed agents are available to answer questions and provide guidance if needed. There's no obligation to purchase, and our experts are here to help you make an informed decision.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 neon-text">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Take the first step toward securing your family's future with the right life insurance coverage.
          </p>
          <Link href="#quote-form" className="btn-primary text-lg px-8 py-3">
            Get Your Quote Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export const metadata = {
  title: 'QuoteLinker – Life Insurance Made Easy',
  description: 'Get personalized life insurance quotes instantly. Compare top providers and find the perfect coverage for your needs.',
} 