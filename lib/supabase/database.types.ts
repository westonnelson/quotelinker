export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          zip_code: string
          insurance_type: string
          created_at: string
          assigned_to: string | null
          contacted: boolean
          status: string | null
          privacy_consent: boolean
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          zip_code: string
          insurance_type?: string
          created_at?: string
          assigned_to?: string | null
          contacted?: boolean
          status?: string | null
          privacy_consent?: boolean
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          zip_code?: string
          insurance_type?: string
          created_at?: string
          assigned_to?: string | null
          contacted?: boolean
          status?: string | null
          privacy_consent?: boolean
        }
      }
      agent_profiles: {
        Row: {
          id: string
          full_name: string
          agency_name: string
          email: string
          phone: string
          states_licensed: string[]
          lines_of_insurance: string[]
          custom_package_request: boolean
          created_at: string
          notification_preferences: Json | null
        }
        Insert: {
          id: string
          full_name: string
          agency_name: string
          email: string
          phone: string
          states_licensed: string[]
          lines_of_insurance: string[]
          custom_package_request?: boolean
          created_at?: string
          notification_preferences?: Json | null
        }
        Update: {
          id?: string
          full_name?: string
          agency_name?: string
          email?: string
          phone?: string
          states_licensed?: string[]
          lines_of_insurance?: string[]
          custom_package_request?: boolean
          created_at?: string
          notification_preferences?: Json | null
        }
      }
      documents: {
        Row: {
          id: string
          lead_id: string
          agent_id: string
          file_name: string
          file_path: string
          document_type: string
          public_url: string
          created_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          agent_id: string
          file_name: string
          file_path: string
          document_type: string
          public_url: string
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string
          agent_id?: string
          file_name?: string
          file_path?: string
          document_type?: string
          public_url?: string
          created_at?: string
        }
      }
      notes: {
        Row: {
          id: string
          lead_id: string
          agent_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          agent_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string
          agent_id?: string
          content?: string
          created_at?: string
        }
      }
    }
  }
}

