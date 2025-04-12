import { createContext, useContext, useReducer, ReactNode } from 'react'
import { QuoteFormData, QuoteStep } from '@/types/quote'

interface QuoteState {
  currentStep: number
  formData: QuoteFormData
  steps: QuoteStep[]
}

type QuoteAction =
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<QuoteFormData> }
  | { type: 'UPDATE_STEP_STATUS'; payload: { stepId: number; isComplete: boolean } }
  | { type: 'RESET_FORM' }

const initialState: QuoteState = {
  currentStep: 1,
  formData: {
    gender: null,
    dateOfBirth: null,
    healthStatus: null,
    coverageAmount: null,
    termLength: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
  },
  steps: [
    { id: 1, title: 'Gender', description: 'Select your gender', isComplete: false },
    { id: 2, title: 'Date of Birth', description: 'Enter your date of birth', isComplete: false },
    { id: 3, title: 'Health Status', description: 'Select your health status', isComplete: false },
    { id: 4, title: 'Coverage Amount', description: 'Choose your coverage amount', isComplete: false },
    { id: 5, title: 'Term Length', description: 'Select your term length', isComplete: false },
    { id: 6, title: 'Contact Info', description: 'Enter your contact information', isComplete: false },
  ],
}

function quoteReducer(state: QuoteState, action: QuoteAction): QuoteState {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload }
    case 'UPDATE_FORM_DATA':
      return { ...state, formData: { ...state.formData, ...action.payload } }
    case 'UPDATE_STEP_STATUS':
      return {
        ...state,
        steps: state.steps.map((step) =>
          step.id === action.payload.stepId ? { ...step, isComplete: action.payload.isComplete } : step
        ),
      }
    case 'RESET_FORM':
      return initialState
    default:
      return state
  }
}

const QuoteContext = createContext<{
  state: QuoteState
  dispatch: React.Dispatch<QuoteAction>
} | null>(null)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quoteReducer, initialState)

  return <QuoteContext.Provider value={{ state, dispatch }}>{children}</QuoteContext.Provider>
}

export function useQuote() {
  const context = useContext(QuoteContext)
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider')
  }
  return context
} 