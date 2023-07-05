import { Country, Gender, Language, MessageSeverity } from '@tstypes'

export interface Message {
  code: number
  message: string
  severity: MessageSeverity
}

export type AddMessageFn = (message: Message) => void

export interface ExampleFormValues {
  firstName: string
  lastName: string
  email: string
  country?: Country
  someUrl: string
  gender?: Gender
  language?: Language
  dateTimePicker?: Date
  fileUploads: string[]
}
