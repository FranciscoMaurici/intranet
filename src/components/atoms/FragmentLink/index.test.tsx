import { render, screen } from '@app-test-utils'

import FragmentLink from './index'

describe('FragmentLink', () => {
  test('should be rendered', () => {
    render(<FragmentLink href={''}>Some text</FragmentLink>)

    const linkText = screen.getByText(/Some text/i)
    expect(linkText).toBeInTheDocument()
  })
})
