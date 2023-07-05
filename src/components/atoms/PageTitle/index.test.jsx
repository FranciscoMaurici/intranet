import { render, screen } from '@app-test-utils'

import PageTitle from './index.tsx'

describe('PageTitle', () => {
  test('should be rendered', () => {
    render(<PageTitle>hello!</PageTitle>)
    const heading = screen.getByRole('heading', { level: 2, name: /hello!/i })

    expect(heading).toBeInTheDocument()
    expect(heading.textContent).toBe('hello!')
  })
})
