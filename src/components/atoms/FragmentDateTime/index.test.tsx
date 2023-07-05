import { useForm } from 'react-hook-form'
import { render, screen } from '@app-test-utils'
import { renderHook } from '@testing-library/react'

import FragmentDateTime from './index'

describe('FragmentDateTime', () => {
  it('should render successfully', () => {
    const {
      result: {
        current: { control },
      },
    } = renderHook(() => useForm())
    render(
      <FragmentDateTime
        control={control}
        name="dateTimePicker"
        views={['day']}
        label="DateTime title"
      />,
    )

    const dateTime = screen.getAllByLabelText('DateTime title')
    expect(dateTime[0]).toBeVisible()
  })
})
