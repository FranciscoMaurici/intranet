import { useForm } from 'react-hook-form'
import { render, screen } from '@app-test-utils'
import { renderHook } from '@testing-library/react'

import FragmentCheckbox from './index'

describe('FragmentCheckbox', () => {
  it('should render successfully', () => {
    const {
      result: {
        current: { control },
      },
    } = renderHook(() => useForm())
    render(<FragmentCheckbox control={control} name="test" label="test" />)

    const checkbox = screen.getByText('test')
    expect(checkbox).toBeInTheDocument()
  })
})
