import { useQuote } from '@/context/QuoteContext'
import { HealthStatus } from '@/types/quote'

const healthOptions: { value: HealthStatus; label: string; description: string }[] = [
  {
    value: 'excellent',
    label: 'Excellent',
    description: 'No health issues, regular exercise, healthy diet',
  },
  {
    value: 'good',
    label: 'Good',
    description: 'Minor health issues, generally healthy lifestyle',
  },
  {
    value: 'fair',
    label: 'Fair',
    description: 'Some health conditions, managing with medication',
  },
  {
    value: 'poor',
    label: 'Poor',
    description: 'Multiple health conditions, ongoing treatment',
  },
]

export default function HealthStatusStep() {
  const { state, dispatch } = useQuote()
  const { formData } = state

  const handleHealthSelect = (status: HealthStatus) => {
    dispatch({ type: 'UPDATE_FORM_DATA', payload: { healthStatus: status } })
    dispatch({ type: 'UPDATE_STEP_STATUS', payload: { stepId: 3, isComplete: true } })
    dispatch({ type: 'SET_CURRENT_STEP', payload: 4 })
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">How would you describe your health?</h2>
      <p className="text-gray-600 mb-8">Select the option that best describes your current health status.</p>

      <div className="space-y-4">
        {healthOptions.map((option) => (
          <label
            key={option.value}
            className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.healthStatus === option.value
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-primary-200'
            }`}
          >
            <input
              type="radio"
              name="healthStatus"
              value={option.value}
              checked={formData.healthStatus === option.value}
              onChange={() => handleHealthSelect(option.value)}
              className="sr-only"
            />
            <div className="flex items-start">
              <div className="flex-1">
                <span className="block text-lg font-medium text-gray-900">{option.label}</span>
                <span className="block text-sm text-gray-600 mt-1">{option.description}</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.healthStatus === option.value
                    ? 'border-primary-600 bg-primary-600'
                    : 'border-gray-300'
                }`}
              >
                {formData.healthStatus === option.value && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
} 