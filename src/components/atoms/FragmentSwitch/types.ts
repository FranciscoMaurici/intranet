import { FieldValues, UseControllerProps } from 'react-hook-form'
import { FormControlLabelProps, SwitchProps } from '@mui/material'

export type IProps<FV extends FieldValues = FieldValues> =
  UseControllerProps<FV> &
    Omit<SwitchProps, 'name'> &
    Omit<FormControlLabelProps, 'control' | 'onChange'>
