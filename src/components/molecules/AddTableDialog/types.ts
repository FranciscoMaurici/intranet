import { SubmitHandler } from 'react-hook-form'

export interface IProps {
  onSubmit: SubmitHandler<TableFormValues>
  onClose(): void
}

export interface TableFormValues {
  rows: number
  cols: number
  withHeaderRow: boolean
}
