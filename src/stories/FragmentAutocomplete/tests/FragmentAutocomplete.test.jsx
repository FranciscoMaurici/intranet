import { useForm } from 'react-hook-form'
import { render, screen } from '@testing-library/react'

import { ComboBox } from '../FragmentAutocomplete.stories'

describe('FragmentAutocomplete tests', () => {
  const { control } = useForm()

  test('FragmentAutoComplete combo box variant should render', () => {
    render(<ComboBox control={control} />)
    expect(screen.getByTestId('combo-box-example')).toBeVisible()
  })

  test('FragmentAutocomplete combo box variant should not render if no "control" prop is provided', () => {
    const { container } = render(<ComboBox />)
    expect(container.innerHTML).toBeNull()
  })
})
