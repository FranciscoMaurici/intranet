import { Country, Gender, Language } from '@tstypes'

import { ExampleFormValues } from './types'

export const languages: Language[] = [
  { id: 1, name: 'English' },
  { id: 2, name: 'Spanish' },
  { id: 3, name: 'French' },
  { id: 4, name: 'German' },
]

export const defaultValues: ExampleFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  country: null,
  someUrl: '',
  gender: null,
  language: languages[1],
  dateTimePicker: null,
  fileUploads: [],
}

export const countries: Country[] = [
  { id: 1, name: 'México' },
  { id: 2, name: 'Argentina' },
  { id: 3, name: 'US' },
  { id: 4, name: 'Russia' },
]

export const genders: Gender[] = [
  { id: 1, name: 'M' },
  { id: 2, name: 'F' },
]

export const emptyValue: Gender = { id: null, name: 'No aplica' }
