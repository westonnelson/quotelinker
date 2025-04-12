'use client'

import { useQuote } from '@/context/QuoteContext'
import { TermLength } from '@/types/quote'

const termOptions: { value: TermLength; label: string; description: string }[] = [
  {
    value: '10',
    label: '10 Years',
    description: 'Best for short-term needs or temporary coverage',
  },
  {
    value: '20',
    label: '20 Years',
    description: 'Most popular choice for growing families',
  },
  {
    value: '30',
    label: '30 Years',
    description: 'Maximum coverage period for long-term protection',
  },
]

export default function TermLengthStep() {
  const { state, dispatch } = useQuote()
  const { formData } = state

  const handleTermSelect = (term: TermLength) => {
    dispatch({ type: 'UPDATE_FORM_DATA', payload: { termLength: term } })
    dispatch({ type: 'UPDATE_STEP_STATUS', payload: { stepId: 5, isComplete: true } })
    dispatch({ type: 'SET_CURRENT_STEP', payload: 6 })
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Your Term Length</h2>
      <p className="text-gray-600 mb-8">Choose how long you want your coverage to last.</p>

      <div className="space-y-4">
        {termOptions.map((option) => (
          <div
            key={option.value}
            className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
              formData.termLength === option.value
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-primary-200'
            }`}
            onClick={() => handleTermSelect(option.value)}
          >
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.label}</h3>
                <p className="text-gray-600">{option.description}</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  formData.termLength === option.value
                    ? 'border-primary-600 bg-primary-600'
                    : 'border-gray-300'
                }`}
              >
                {formData.termLength === option.value && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 