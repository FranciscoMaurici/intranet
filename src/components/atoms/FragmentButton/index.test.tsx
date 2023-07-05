import { render, screen } from '@app-test-utils'

import FragmentButton from './index'

describe('FragmentButton', () => {
  test('should be rendered', () => {
    render(
      <FragmentButton onClick={() => null} variant="outlined">
        Cancel
      </FragmentButton>,
    )
    const text = screen.getByText(/Cancel/i)
    expect(text).toBeInTheDocument()
  })
})
