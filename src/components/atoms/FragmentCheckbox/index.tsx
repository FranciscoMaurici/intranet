import { Controller, FieldValues } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'

import { StyledCheckbox } from './styles'
import { IProps } from './types'

const FragmentCheckbox = <FV extends FieldValues>({
  checkboxProps,
  label,
  labelPlacement,

  // Controller props
  name,
  control,
}: IProps<FV>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormControl>
        <FormControlLabel
          label={label}
          labelPlacement={labelPlacement}
          control={
            <StyledCheckbox
              checked={field?.value === true}
              {...field}
              {...checkboxProps}
            />
          }
        />
      </FormControl>
    )}
  />
)

export default FragmentCheckbox
