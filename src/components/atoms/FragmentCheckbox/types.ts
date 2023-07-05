import { FieldValues, UseControllerProps } from 'react-hook-form'
import { CheckboxProps } from '@mui/material/Checkbox'
import { FormControlLabelProps } from '@mui/material/FormControlLabel'

export type IProps<FV extends FieldValues = FieldValues> =
  UseControllerProps<FV> &
    Omit<FormControlLabelProps, 'control' | 'onChange'> & {
      checkboxProps?: CheckboxProps
    }
