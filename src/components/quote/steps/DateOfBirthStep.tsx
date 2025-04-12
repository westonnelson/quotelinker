'use client'

import { useQuote } from '@/context/QuoteContext'

export default function DateOfBirthStep() {
  const { state, dispatch } = useQuote()
  const { formData } = state

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    const birthDate = new Date(date)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    if (age < 18) {
      alert('You must be at least 18 years old to get a quote')
      return
    }

    dispatch({ type: 'UPDATE_FORM_DATA', payload: { dateOfBirth: date } })
    dispatch({ type: 'UPDATE_STEP_STATUS', payload: { stepId: 2, isComplete: true } })
    dispatch({ type: 'SET_CURRENT_STEP', payload: 3 })
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">When were you born?</h2>
      <p className="text-gray-600 mb-8">This helps us calculate your premium accurately.</p>

      <div className="space-y-4">
        <input
          type="date"
          value={formData.dateOfBirth || ''}
          onChange={handleDateChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          max={new Date().toISOString().split('T')[0]}
        />
      </div>
    </div>
  )
} 