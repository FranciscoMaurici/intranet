import { useForm } from 'react-hook-form'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import FragmentAutocomplete from '../../components/molecules/FragmentAutocomplete'

export default {
  title: 'Fragment/Autocomplete',
  component: FragmentAutocomplete,
} as ComponentMeta<typeof FragmentAutocomplete>

const top100Films = [
  { name: 'The Shawshank Redemption', year: 1994 },
  { name: 'The Godfather', year: 1972 },
  { name: 'The Godfather: Part II', year: 1974 },
  { name: 'The Dark Knight', year: 2008 },
  { name: '12 Angry Men', year: 1957 },
  { name: "Schindler's List", year: 1993 },
  { name: 'Pulp Fiction', year: 1994 },
  {
    name: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { name: 'The Good, the Bad and the Ugly', year: 1966 },
  { name: 'Fight Club', year: 1999 },
  {
    name: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    name: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { name: 'Forrest Gump', year: 1994 },
]

const Template: ComponentStory<typeof FragmentAutocomplete> = args => {
  const { control } = useForm()
  return <FragmentAutocomplete control={control} {...args} />
}

export const ComboBox = Template.bind({})
ComboBox.args = {
  name: 'autocomplete',
  label: 'Combobox autocomplete',
  disablePortal: true,
  id: 'combo-box-example',
  testid: 'combo-box-example',
  options: top100Films,
}
