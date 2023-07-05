import { render, screen } from '@app-test-utils'

import FragmentMenuItem from './index.tsx'

describe('FragmentMenuItem', () => {
  test('should be rendered', () => {
    render(<FragmentMenuItem />)
    const menuItem = screen.getByRole('menuitem')

    expect(menuItem).toBeInTheDocument()
  })
})
