import { Country, State } from './common'

export interface ILead {
  id?: number
  first_name: string
  last_name: string
  title?: string
  email: string
  company: string
  mobile: string | null
  phone?: string | null
  country: Country | null
  city: string | null
  state: State | null
  url?: string | null
  last_updated_by?: number
  created_at?: Date | string
  updated_at?: Date | string
  is_active?: string
}
