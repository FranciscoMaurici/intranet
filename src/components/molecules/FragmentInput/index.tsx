import { Controller, FieldValues } from 'react-hook-form'

import { StyledTextField } from './styles'
import { IProps } from './types'

const FragmentInput = <FV extends FieldValues>({
  fullWidth = true,
  disableUnderline = false,

  // Controller props
  rules,
  name,
  shouldUnregister,
  defaultValue,
  control,

  className = '',
  ...textFieldProps
}: IProps<FV>) => (
  <Controller<FV>
    name={name}
    shouldUnregister={shouldUnregister}
    defaultValue={defaultValue}
    control={control}
    rules={typeof rules === 'string' ? { required: rules } : rules}
    render={({ field: { ref, ...field }, fieldState: { error } }) => (
      <StyledTextField
        className={`FragmentInput ${className}`}
        error={!!error}
        inputRef={ref}
        fullWidth={fullWidth}
        helperText={error && error.message}
        variant="standard"
        InputProps={{ disableUnderline }}
        inputProps={{
          'data-testid': textFieldProps.label,
        }}
        {...textFieldProps}
        {...field}
      />
    )}
  />
)

export default FragmentInput
export type { IProps }
