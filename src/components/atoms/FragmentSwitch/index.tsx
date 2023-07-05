import { Controller, FieldValues } from 'react-hook-form'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'

import { StyledSwitch } from './styles'
import { IProps } from './types'

const FragmentSwitch = <FV extends FieldValues>({
  name,
  control,
  label,
  labelPlacement,
}: IProps<FV>) => (
  <FormGroup aria-label="position" row>
    <FormControlLabel
      label={label}
      labelPlacement={labelPlacement}
      control={
        <Controller
          control={control}
          name={name}
          render={({ field }) => <StyledSwitch {...field} />}
        />
      }
    />
  </FormGroup>
)

export default FragmentSwitch
