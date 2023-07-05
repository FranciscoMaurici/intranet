import { render, screen } from '@app-test-utils'

import BenefitsHeader from './index'

describe('BenefitsHeader', () => {
  beforeEach(() => {
    render(<BenefitsHeader />)
  })
  it('should show an h1 title with expected text content', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Culture & Benefits',
    )
  })

  it('should show an h4 subheading  with expected text content', () => {
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'KNOW OUR',
    )
  })

  it('should show expected text content', () => {
    expect(
      screen.getByText(
        `We define Distillery as a leading software development company that provides elite international talent to the world's best brands. We've formulated four BEST values that we translate to our customers and to our day-to-day operations:`,
      ),
    ).toBeInTheDocument()
  })

  it('should show two images', () => {
    expect(screen.getAllByRole('img').length).toBe(2)
  })

  it('first image must have expected source', async () => {
    expect(
      screen
        .getAllByRole('img')[0]
        .getAttribute('src')
        .includes('benefit-header-left'),
    ).toBe(true)
  })

  it('second image must have expected source', async () => {
    expect(
      screen
        .getAllByRole('img')[1]
        .getAttribute('src')
        .includes('benefit-header-right'),
    ).toBe(true)
  })
})
