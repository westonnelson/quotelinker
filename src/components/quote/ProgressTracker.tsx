import { useQuote } from '@/context/QuoteContext'

export default function ProgressTracker() {
  const { state } = useQuote()
  const { steps, currentStep } = state

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between relative">
        {/* Progress bar */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2">
          <div
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`relative flex flex-col items-center ${
              index + 1 === currentStep ? 'text-primary-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                step.isComplete
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : index + 1 === currentStep
                  ? 'border-primary-600 text-primary-600'
                  : 'border-gray-300'
              }`}
            >
              {step.isComplete ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <span className="mt-2 text-sm font-medium hidden sm:block">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
} 