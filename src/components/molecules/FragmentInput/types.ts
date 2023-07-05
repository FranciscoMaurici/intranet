import { FieldValues, UseControllerProps } from 'react-hook-form'
import { TextFieldProps } from '@mui/material/TextField'

export type IProps<FV extends FieldValues = FieldValues> =
  UseControllerProps<FV> &
    Omit<TextFieldProps, 'name'> & {
      rules?: string | UseControllerProps<FV>['rules']
      disableUnderline?: boolean
    }
