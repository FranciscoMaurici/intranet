/* eslint-disable no-console */
import { useMemo, useState } from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { IProps } from './types'

const FragmentDateTime = <FV extends FieldValues>({
  views,
  label,
  disableUnderline = false,

  // Controller props
  rules,
  name,
  shouldUnregister,
  defaultValue,
  control,

  className = '',
  ...textFieldProps
}: IProps<FV>) => {
  const [error, setError] = useState(null)

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'disablePast': {
        return 'Your date is not valid since you selected a past time'
      }

      default: {
        return ''
      }
    }
  }, [error])

  return (
    <Controller<FV>
      name={name}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      control={control}
      rules={typeof rules === 'string' ? { required: rules } : rules}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label={label}
            views={views}
            className={`FragmentDateTime ${className}`}
            inputRef={ref}
            helperText={error && error.message}
            variant="standard"
            InputProps={{ disableUnderline }}
            disablePast
            onError={newError => setError(newError)}
            slotProps={{
              textField: {
                helperText: errorMessage,
              },
            }}
            fullWidth
            inputProps={{
              'data-testid': `FragmentDateTime-${label}`,
            }}
            {...textFieldProps}
            {...field}
          />
        </LocalizationProvider>
      )}
    />
  )
}

export default FragmentDateTime
