import { Controller, FieldValues as RHFFieldValues } from 'react-hook-form'
import { Box, TextField } from '@mui/material'
import Autocomplete, {
  AutocompleteProps as MUIAutocompleteProps,
} from '@mui/material/Autocomplete'

import { IProps } from './types'
import { UserAvatar } from './utils'

import { isValidId } from '@/utils/validations'

const FragmentAutocomplete = <
  FieldValues extends RHFFieldValues,
  OptionsType extends RHFFieldValues,
  DisableClearable extends boolean | undefined = undefined,
>({
  // Custom FragmentAutocomplete props
  emptyOption = null,

  // TextFieldProps
  className = '',
  label,
  variant = 'standard',

  // AutocompleteProps
  options,

  // ControllerProps
  rules,
  required,
  autocompleteProps,
  onChange,
  isUser,
  ...controllerProps
}: IProps<FieldValues, OptionsType, DisableClearable>) => (
  <Controller<FieldValues>
    {...controllerProps}
    rules={
      typeof rules === 'string'
        ? {
            validate: {
              isValidId: value => isValidId(value, rules),
            },
          }
        : rules
    }
    render={({ field: { ref, value, ...field }, fieldState: { error } }) => {
      const handleChange = value => {
        field.onChange(value)

        if (onChange) onChange(value)
      }

      return (
        <Autocomplete<OptionsType, false, DisableClearable, false>
          {...field}
          {...autocompleteProps}
          getOptionLabel={
            autocompleteProps?.getOptionLabel ||
            ((option: OptionsType) => option.label || option.name)
          }
          className={`FragmentAutocomplete ${className}`}
          value={
            value as MUIAutocompleteProps<
              OptionsType,
              false,
              DisableClearable,
              false
            >['value']
          }
          getOptionDisabled={option => option?.name === ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, data, reason) =>
            handleChange(reason === 'clear' ? emptyOption : data)
          }
          options={emptyOption ? [emptyOption, ...options] : options}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {isUser && <UserAvatar option={option} />}
              {option.name}
            </Box>
          )}
          renderInput={params => (
            <TextField
              {...params}
              required={required}
              className={`FragmentAutocomplete ${className}`}
              error={!!error}
              helperText={error?.message}
              inputRef={ref}
              label={label}
              variant={variant}
              InputProps={{
                ...params.InputProps,
                startAdornment:
                  value && isUser ? <UserAvatar option={value} /> : null,
              }}
            />
          )}
        />
      )
    }}
  />
)

export default FragmentAutocomplete
export type { IProps }
