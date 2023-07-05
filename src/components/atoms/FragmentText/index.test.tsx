import { render, screen } from '@app-test-utils'

import FragmentText from './index'

describe('FragmentText', () => {
  test('should be rendered', () => {
    render(<FragmentText variant="headingSmall">Some text</FragmentText>)
    const heading = screen.getByRole('heading', { level: 3, name: /text/i })

    expect(heading).toBeInTheDocument()
    expect(heading.textContent).toBe('Some text')
  })
})
