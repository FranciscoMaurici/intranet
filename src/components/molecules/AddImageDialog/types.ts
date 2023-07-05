import { SubmitHandler } from 'react-hook-form'

export interface IProps {
  onSubmit: SubmitHandler<ImageFormValues>
  onClose(): void
  setIsSubmitting(isSubmitting: boolean): void
}

export interface ImageFormValues {
  src: string
  alt: string
}
