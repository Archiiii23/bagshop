import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Category = {
  id: string
  name: string
  slug: string
  starting_price: number
  image_url: string
  created_at: string
}

export type Product = {
  id: string
  name: string
  category_id: string
  original_price: number
  sale_price: number
  image_url: string
  badge_discount: string | null
  badge_new: boolean
  in_stock: boolean
  created_at: string
}

export type Testimonial = {
  id: string
  username: string
  display_name: string
  avatar_url: string
  rating: number
  content: string
  product_name: string
  created_at: string
}
