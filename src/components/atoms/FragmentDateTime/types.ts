import { FieldValues, UseControllerProps } from 'react-hook-form'
import { TextFieldProps } from '@mui/material/TextField'
import { DateOrTimeView } from '@mui/x-date-pickers'

export interface DateTimeProps {
  views: DateOrTimeView[]
  label: string
  fullWidth?: boolean
  onError?: () => void
}

export type IProps<FV extends FieldValues = FieldValues> =
  UseControllerProps<FV> &
    TextFieldProps &
    DateTimeProps & {
      rules?: string | UseControllerProps<FV>['rules']
      disableUnderline?: boolean
      className?: string
    }
