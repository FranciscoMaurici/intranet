import { render, screen } from '@app-test-utils'

import FragmentLoadingOverlay from './index.tsx'

describe('FragmentLoadingOverlay', () => {
  test('Text Rendering', () => {
    render(<FragmentLoadingOverlay />)
    const text = screen.getByText(/Loading/i)
    expect(text).toBeInTheDocument()
  })
})
