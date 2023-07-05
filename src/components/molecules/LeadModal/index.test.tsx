import { renderWithSession } from '@app-test-utils'
import { act, fireEvent, screen } from '@testing-library/react'

import LeadModal from '.'

jest.mock('@/redux/hooks', () => ({
  useAppSelector: () => ({ showOverlay: false }),
}))

describe('LeadsModal', () => {
  beforeEach(async () => {
    await act(async () =>
      renderWithSession(<LeadModal open handleClose={jest.fn()} />),
    )
  })

  it('should have expected title', () => {
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /Submit a new lead/i,
    )
  })
  it('should have required first name field', () => {
    expect(screen.getByLabelText(/first name/i)).toBeRequired()
  })
  it('should have required last name field', () => {
    expect(screen.getByLabelText(/last name/i)).toBeRequired()
  })
  it('should have required title field', () => {
    expect(screen.getByLabelText(/title/i)).toBeRequired()
  })
  it('should have required email field', () => {
    expect(screen.getByLabelText(/email/i)).toBeRequired()
  })
  it('should have required company field', () => {
    expect(screen.getByLabelText(/company/i)).toBeRequired()
  })
  it('should have required mobile field', () => {
    expect(screen.getByLabelText(/mobile/i)).toBeRequired()
  })
  it('should have required phone field', () => {
    expect(screen.getByLabelText(/phone/i)).toBeRequired()
  })
  it('should have required country field', () => {
    expect(screen.getByLabelText(/country/i)).toBeRequired()
  })
  it('should have required state field', () => {
    expect(screen.getByLabelText(/state/i)).toBeRequired()
  })
  it('should have required city field', () => {
    expect(screen.getByLabelText(/city/i)).toBeRequired()
  })
  it('should have required url field', () => {
    expect(screen.getByLabelText(/website/i)).toBeRequired()
  })
  it('should have disabled submit button', () => {
    expect(screen.getByText(/submit lead/i)).toBeDisabled()
  })

  it('should enable submit button on dirt form', async () => {
    await act(() => {
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'Gonzalo' },
      })
    })

    expect(screen.getByText(/submit lead/i)).not.toBeDisabled()
  })

  it('should disabled state field if selected country is different than "US"', async () => {
    expect(screen.getByLabelText(/state/i)).not.toBeDisabled()
    await act(() => {
      fireEvent.mouseDown(screen.getByLabelText(/country/i))
    })
    await act(() => {
      fireEvent.click(screen.getByText(/Mexico/i))
    })
    expect(screen.getByLabelText(/state/i)).toBeDisabled()
  })
})
