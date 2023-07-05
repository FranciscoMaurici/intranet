import {
  ControllerRenderProps,
  FieldValues as RHFFieldValues,
  UseControllerProps,
} from 'react-hook-form'
import { AutocompleteProps as MUIAutocompleteProps } from '@mui/material/Autocomplete'
import { TextFieldProps } from '@mui/material/TextField'

export type IProps<
  FieldValues extends RHFFieldValues,
  OptionType,
  DisableClearable extends boolean | undefined,
> = UseControllerProps<FieldValues> &
  Pick<TextFieldProps, 'className' | 'label' | 'variant'> & {
    emptyOption?: OptionType
    rules?: string | UseControllerProps<FieldValues>['rules']
    options: MUIAutocompleteProps<
      OptionType,
      false,
      DisableClearable,
      false
    >['options']
    autocompleteProps?: Omit<
      MUIAutocompleteProps<OptionType, false, DisableClearable, false>,
      'renderInput' | 'defaultValue' | 'value' | 'options'
    >
    required?: boolean
    onChange?: ControllerRenderProps['onChange']
    isUser?: boolean
  }
