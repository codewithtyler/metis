export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      teams: {
        Row: {
          id: string
          name: string
          domain: string
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          domain: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          domain?: string
          created_at?: string | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          team_id: string | null
          access_type: string
          default_template_id: string | null
          allowed_domains: string[] | null
          slug: string
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          team_id?: string | null
          access_type?: string
          default_template_id?: string | null
          allowed_domains?: string[] | null
          slug: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          team_id?: string | null
          access_type?: string
          default_template_id?: string | null
          allowed_domains?: string[] | null
          slug?: string
          created_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          name: string | null
          email: string | null
          role: string
          team_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          name?: string | null
          email?: string | null
          role?: string
          team_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          role?: string
          team_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      product_access: {
        Row: {
          id: string
          user_id: string | null
          product_id: string | null
          access_type: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          product_id?: string | null
          access_type?: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          product_id?: string | null
          access_type?: string
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}