import { useForm } from 'react-hook-form'
import { render, screen } from '@testing-library/react'

import { Filled, Outlined, Standard } from '../FragmentInput.stories'

describe('FragmentInput tests', () => {
  const { control } = useForm()

  test('FragmentInput standard variant should render', () => {
    render(<Standard control={control} />)
    expect(screen.getByPlaceholderText(/standard/i)).toBe()
  })

  test('FragmentInput filled variant should render', () => {
    render(<Filled control={control} />)
    expect(screen.getByPlaceholderText(/filled/i)).toBe()
  })

  test('FragmentInput outlined variant should render', () => {
    render(<Outlined control={control} />)
    expect(screen.getByPlaceholderText(/outlined/i)).toBe()
  })

  test('FragmentInput standard variant should throw error if no "control" prop is provided', () => {
    const { container } = render(<Standard />)
    expect(container.innerHTML).toBeNull()
  })
})
