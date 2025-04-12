'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuote } from '@/context/QuoteContext'

interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'select' | 'checkbox'
  required?: boolean
  min?: number
  max?: number
  pattern?: string
  options?: Array<{ value: string; label: string }>
}

interface FormStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  fields: FormField[]
}

interface FormData {
  [key: string]: string | string[] | boolean
}

// Form steps data
const formSteps = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    fields: [
      { id: 'firstName', label: 'First Name', type: 'text', required: true },
      { id: 'lastName', label: 'Last Name', type: 'text', required: true },
      { id: 'email', label: 'Email Address', type: 'email', required: true },
      { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
    ]
  },
  {
    id: 'personal-details',
    title: 'Personal Details',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    fields: [
      { 
        id: 'gender', 
        label: 'Gender', 
        type: 'select', 
        required: true,
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
          { value: 'prefer-not-to-say', label: 'Prefer not to say' }
        ]
      },
      { 
        id: 'dateOfBirth', 
        label: 'Date of Birth', 
        type: 'date', 
        required: true 
      },
      { 
        id: 'height', 
        label: 'Height', 
        type: 'select', 
        required: true,
        options: [
          { value: '4-10', label: '4\'10"' },
          { value: '4-11', label: '4\'11"' },
          { value: '5-0', label: '5\'0"' },
          { value: '5-1', label: '5\'1"' },
          { value: '5-2', label: '5\'2"' },
          { value: '5-3', label: '5\'3"' },
          { value: '5-4', label: '5\'4"' },
          { value: '5-5', label: '5\'5"' },
          { value: '5-6', label: '5\'6"' },
          { value: '5-7', label: '5\'7"' },
          { value: '5-8', label: '5\'8"' },
          { value: '5-9', label: '5\'9"' },
          { value: '5-10', label: '5\'10"' },
          { value: '5-11', label: '5\'11"' },
          { value: '6-0', label: '6\'0"' },
          { value: '6-1', label: '6\'1"' },
          { value: '6-2', label: '6\'2"' },
          { value: '6-3', label: '6\'3"' },
          { value: '6-4', label: '6\'4"' },
          { value: '6-5', label: '6\'5"' },
          { value: '6-6', label: '6\'6"' },
          { value: '6-7', label: '6\'7"' },
          { value: '6-8', label: '6\'8"' },
        ]
      },
      { 
        id: 'weight', 
        label: 'Weight (lbs)', 
        type: 'number', 
        required: true,
        min: 80,
        max: 500
      },
    ]
  },
  {
    id: 'health-info',
    title: 'Health Information',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    fields: [
      { 
        id: 'smoker', 
        label: 'Do you smoke or use tobacco?', 
        type: 'radio', 
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'occasionally', label: 'Occasionally' }
        ]
      },
      { 
        id: 'healthConditions', 
        label: 'Do you have any health conditions?', 
        type: 'checkbox', 
        required: true,
        options: [
          { value: 'diabetes', label: 'Diabetes' },
          { value: 'heart-disease', label: 'Heart Disease' },
          { value: 'cancer', label: 'Cancer' },
          { value: 'high-blood-pressure', label: 'High Blood Pressure' },
          { value: 'none', label: 'None' }
        ]
      },
      { 
        id: 'familyHistory', 
        label: 'Family history of health issues?', 
        type: 'radio', 
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'not-sure', label: 'Not Sure' }
        ]
      },
    ]
  },
  {
    id: 'coverage-details',
    title: 'Coverage Details',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    fields: [
      { 
        id: 'coverageAmount', 
        label: 'How much coverage do you need?', 
        type: 'select', 
        required: true,
        options: [
          { value: '100000', label: '$100,000' },
          { value: '250000', label: '$250,000' },
          { value: '500000', label: '$500,000' },
          { value: '750000', label: '$750,000' },
          { value: '1000000', label: '$1,000,000' },
          { value: '1500000', label: '$1,500,000' },
          { value: '2000000', label: '$2,000,000' },
        ]
      },
      { 
        id: 'coverageType', 
        label: 'What type of coverage do you prefer?', 
        type: 'select',
        required: true,
        options: [
          { value: 'term', label: 'Term Life Insurance' },
          { value: 'whole', label: 'Whole Life Insurance' },
          { value: 'universal', label: 'Universal Life Insurance' },
          { value: 'not-sure', label: 'Not Sure - Let an expert help' }
        ]
      },
      { 
        id: 'termLength', 
        label: 'For how long do you need coverage?', 
        type: 'select', 
        required: true,
        options: [
          { value: '10', label: '10 Years' },
          { value: '15', label: '15 Years' },
          { value: '20', label: '20 Years' },
          { value: '25', label: '25 Years' },
          { value: '30', label: '30 Years' },
        ]
      },
    ]
  },
  {
    id: 'final-details',
    title: 'Final Details',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    fields: [
      { 
        id: 'address', 
        label: 'Street Address', 
        type: 'text', 
        required: true 
      },
      { 
        id: 'city', 
        label: 'City', 
        type: 'text', 
        required: true 
      },
      { 
        id: 'state', 
        label: 'State', 
        type: 'select', 
        required: true,
        options: [
          { value: 'AL', label: 'Alabama' },
          { value: 'AK', label: 'Alaska' },
          { value: 'AZ', label: 'Arizona' },
          { value: 'AR', label: 'Arkansas' },
          { value: 'CA', label: 'California' },
          { value: 'CO', label: 'Colorado' },
          { value: 'CT', label: 'Connecticut' },
          { value: 'DE', label: 'Delaware' },
          { value: 'FL', label: 'Florida' },
          { value: 'GA', label: 'Georgia' },
          { value: 'HI', label: 'Hawaii' },
          { value: 'ID', label: 'Idaho' },
          { value: 'IL', label: 'Illinois' },
          { value: 'IN', label: 'Indiana' },
          { value: 'IA', label: 'Iowa' },
          { value: 'KS', label: 'Kansas' },
          { value: 'KY', label: 'Kentucky' },
          { value: 'LA', label: 'Louisiana' },
          { value: 'ME', label: 'Maine' },
          { value: 'MD', label: 'Maryland' },
          { value: 'MA', label: 'Massachusetts' },
          { value: 'MI', label: 'Michigan' },
          { value: 'MN', label: 'Minnesota' },
          { value: 'MS', label: 'Mississippi' },
          { value: 'MO', label: 'Missouri' },
          { value: 'MT', label: 'Montana' },
          { value: 'NE', label: 'Nebraska' },
          { value: 'NV', label: 'Nevada' },
          { value: 'NH', label: 'New Hampshire' },
          { value: 'NJ', label: 'New Jersey' },
          { value: 'NM', label: 'New Mexico' },
          { value: 'NY', label: 'New York' },
          { value: 'NC', label: 'North Carolina' },
          { value: 'ND', label: 'North Dakota' },
          { value: 'OH', label: 'Ohio' },
          { value: 'OK', label: 'Oklahoma' },
          { value: 'OR', label: 'Oregon' },
          { value: 'PA', label: 'Pennsylvania' },
          { value: 'RI', label: 'Rhode Island' },
          { value: 'SC', label: 'South Carolina' },
          { value: 'SD', label: 'South Dakota' },
          { value: 'TN', label: 'Tennessee' },
          { value: 'TX', label: 'Texas' },
          { value: 'UT', label: 'Utah' },
          { value: 'VT', label: 'Vermont' },
          { value: 'VA', label: 'Virginia' },
          { value: 'WA', label: 'Washington' },
          { value: 'WV', label: 'West Virginia' },
          { value: 'WI', label: 'Wisconsin' },
          { value: 'WY', label: 'Wyoming' },
        ]
      },
      { 
        id: 'zipCode', 
        label: 'ZIP Code', 
        type: 'text', 
        required: true,
        pattern: '[0-9]{5}'
      },
    ]
  }
]

export default function MultiStepForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      })
    }
  }

  // Handle checkbox group change
  const handleCheckboxGroupChange = (name: string, value: string, checked: boolean) => {
    const currentValues = formData[name] || []
    
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...currentValues, value]
      })
    } else {
      setFormData({
        ...formData,
        [name]: currentValues.filter(val => val !== value)
      })
    }
  }

  // Validate current step
  const validateStep = () => {
    const currentFields = formSteps[currentStep].fields
    const newErrors: Record<string, string> = {}
    
    currentFields.forEach(field => {
      if (field.required) {
        if (field.type === 'checkbox' && (!formData[field.id] || (formData[field.id] as string[]).length === 0)) {
          newErrors[field.id] = 'This field is required'
        } else if (!formData[field.id]) {
          newErrors[field.id] = 'This field is required'
        }
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Go to next step
  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(currentStep + 1)
        window.scrollTo(0, 0)
      } else {
        submitForm()
      }
    }
  }

  // Go to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // Submit form
  const submitForm = async () => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Redirect to thank you page
      router.push('/thank-you')
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
    }
  }

  // Render form field based on type
  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'date':
      case 'number':
        return (
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            value={formData[field.id] as string || ''}
            onChange={handleChange}
            className="form-input w-full"
            min={field.min}
            max={field.max}
            pattern={field.pattern}
            placeholder={`Enter your ${field.label.toLowerCase()}`}
          />
        )
      
      case 'select':
        return (
          <select
            id={field.id}
            name={field.id}
            value={formData[field.id] as string || ''}
            onChange={handleChange}
            className="form-input w-full"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.id}-${option.value}`}
                  name={field.id}
                  value={option.value}
                  checked={formData[field.id] === option.value}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 bg-gray-700"
                />
                <label
                  htmlFor={`${field.id}-${option.value}`}
                  className="ml-3 block text-sm font-medium text-gray-300"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <div key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${field.id}-${option.value}`}
                  name={field.id}
                  value={option.value}
                  checked={(formData[field.id] as string[] || []).includes(option.value)}
                  onChange={(e) => handleCheckboxGroupChange(field.id, option.value, e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 bg-gray-700"
                />
                <label
                  htmlFor={`${field.id}-${option.value}`}
                  className="ml-3 block text-sm font-medium text-gray-300"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Rest of the component code remains unchanged */}
    </div>
  )
}