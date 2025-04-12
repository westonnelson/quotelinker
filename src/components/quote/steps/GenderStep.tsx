'use client'

import { useQuote } from '@/context/QuoteContext'
import { FaMale, FaFemale } from 'react-icons/fa'

export default function GenderStep() {
  const { state, dispatch } = useQuote()
  const { formData } = state

  const handleGenderSelect = (gender: 'male' | 'female') => {
    dispatch({ type: 'UPDATE_FORM_DATA', payload: { gender } })
    dispatch({ type: 'UPDATE_STEP_STATUS', payload: { stepId: 1, isComplete: true } })
    dispatch({ type: 'SET_CURRENT_STEP', payload: 2 })
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Your Gender</h2>
      <p className="text-gray-600 mb-8">This helps us provide you with the most accurate quote.</p>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleGenderSelect('male')}
          className={`p-6 rounded-lg border-2 transition-all ${
            formData.gender === 'male'
              ? 'border-primary-600 bg-primary-50 text-primary-600'
              : 'border-gray-200 hover:border-primary-200'
          }`}
        >
          <FaMale className="w-12 h-12 mx-auto mb-4" />
          <span className="block text-lg font-medium">Male</span>
        </button>

        <button
          onClick={() => handleGenderSelect('female')}
          className={`p-6 rounded-lg border-2 transition-all ${
            formData.gender === 'female'
              ? 'border-primary-600 bg-primary-50 text-primary-600'
              : 'border-gray-200 hover:border-primary-200'
          }`}
        >
          <FaFemale className="w-12 h-12 mx-auto mb-4" />
          <span className="block text-lg font-medium">Female</span>
        </button>
      </div>
    </div>
  )
} 