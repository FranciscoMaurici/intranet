import { renderWithSession, screen } from '@app-test-utils'

import Leads from '.'

jest.mock('@/redux/hooks', () => ({
  useAppSelector: () => ({ showOverlay: false }),
}))

describe('Leads', () => {
  beforeEach(() => {
    renderWithSession(<Leads />)
  })
  it('should have expected page heading', () => {
    expect(screen.getByRole('heading', { name: /leads/i })).toBeInTheDocument()
  })

  it('should have expected page subheading', () => {
    expect(
      screen.getByRole('heading', {
        name: /we're thrilled to connect with your network/i,
      }),
    ).toBeInTheDocument()
  })
  it('should have submit a lead button', () => {
    expect(
      screen.getByRole('button', { name: /submit a lead/i }),
    ).toBeInTheDocument()
  })
})
