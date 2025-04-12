'use client'

import { useQuote } from '@/context/QuoteContext'
import { useState, useEffect } from 'react'

const coverageOptions = [
  { value: 100000, label: '$100,000' },
  { value: 250000, label: '$250,000' },
  { value: 500000, label: '$500,000' },
  { value: 1000000, label: '$1,000,000' },
  { value: 2000000, label: '$2,000,000' },
]

export default function CoverageAmountStep() {
  const { state, dispatch } = useQuote()
  const { formData } = state
  const [selectedAmount, setSelectedAmount] = useState(formData.coverageAmount || 250000)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    dispatch({ type: 'UPDATE_FORM_DATA', payload: { coverageAmount: amount } })
    dispatch({ type: 'UPDATE_STEP_STATUS', payload: { stepId: 4, isComplete: true } })
    dispatch({ type: 'SET_CURRENT_STEP', payload: 5 })
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">How much coverage do you need?</h2>
      <p className="text-gray-600 mb-8">Select the amount of coverage that best fits your needs.</p>

      <div className="space-y-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">
            {formatCurrency(selectedAmount)}
          </div>
          <div className="text-sm text-gray-500">Estimated monthly premium will be calculated based on this amount</div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {coverageOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAmountSelect(option.value)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedAmount === option.value
                  ? 'border-primary-600 bg-primary-50 text-primary-600'
                  : 'border-gray-200 hover:border-primary-200'
              }`}
            >
              <span className="block text-lg font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 