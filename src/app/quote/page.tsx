import { QuoteProvider } from '@/context/QuoteContext'
import ProgressTracker from '@/components/quote/ProgressTracker'
import GenderStep from '@/components/quote/steps/GenderStep'
import DateOfBirthStep from '@/components/quote/steps/DateOfBirthStep'
import HealthStatusStep from '@/components/quote/steps/HealthStatusStep'
import CoverageAmountStep from '@/components/quote/steps/CoverageAmountStep'
import TermLengthStep from '@/components/quote/steps/TermLengthStep'
import ContactInfoStep from '@/components/quote/steps/ContactInfoStep'
import ThankYouStep from '@/components/quote/steps/ThankYouStep'

export default function QuotePage() {
  return (
    <QuoteProvider>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ProgressTracker />
          
          <div className="bg-white shadow-sm rounded-lg mx-4 mb-8">
            {getCurrentStep()}
          </div>
        </div>
      </main>
    </QuoteProvider>
  )
}

function getCurrentStep() {
  // This will be replaced with actual step management using the QuoteContext
  return (
    <>
      <GenderStep />
      <DateOfBirthStep />
      <HealthStatusStep />
      <CoverageAmountStep />
      <TermLengthStep />
      <ContactInfoStep />
      <ThankYouStep />
    </>
  )
} 