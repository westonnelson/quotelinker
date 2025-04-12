import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function saveQuoteData(formData: any) {
  const { data, error } = await supabase
    .from('quotes')
    .insert([
      {
        gender: formData.gender,
        date_of_birth: formData.dateOfBirth,
        health_status: formData.healthStatus,
        coverage_amount: formData.coverageAmount,
        term_length: formData.termLength,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        created_at: new Date().toISOString(),
      },
    ])
    .select()

  if (error) {
    console.error('Error saving quote data:', error)
    throw error
  }

  return data
} 