export type Gender = 'male' | 'female'

export type HealthStatus = 'excellent' | 'good' | 'fair' | 'poor'

export type TermLength = '10' | '20' | '30'

export interface QuoteFormData {
  gender: Gender | null
  dateOfBirth: string | null
  healthStatus: HealthStatus | null
  coverageAmount: number | null
  termLength: TermLength | null
  firstName: string | null
  lastName: string | null
  email: string | null
  phone: string | null
}

export interface QuoteStep {
  id: number
  title: string
  description: string
  isComplete: boolean
} 