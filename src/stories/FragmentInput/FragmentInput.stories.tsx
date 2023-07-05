import { useForm } from 'react-hook-form'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import FragmentInput from '../../components/molecules/FragmentInput'

export default {
  title: 'Fragment/Input',
  component: FragmentInput,
} as ComponentMeta<typeof FragmentInput>

const Template: ComponentStory<typeof FragmentInput> = args => {
  const { control } = useForm()
  return <FragmentInput control={control} {...args} />
}

export const Standard = Template.bind({})
Standard.args = {
  name: 'standard',
  variant: 'standard',
  placeholder: 'Standard version input',
}

export const Filled = Template.bind({})
Filled.args = {
  name: 'filled',
  variant: 'filled',
  placeholder: 'Filled version input',
}

export const Outlined = Template.bind({})
Outlined.args = {
  name: 'outlined',
  variant: 'outlined',
  placeholder: 'Outlined version input',
}
