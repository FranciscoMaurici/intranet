import { render, screen } from '@app-test-utils'

import FragmentTooltip from './index'

describe('FragmentTooltip', () => {
  test('should be rendered', () => {
    render(
      <FragmentTooltip title="Log out" placement="top">
        <p>Test</p>
      </FragmentTooltip>,
    )
    const ariaLabel = screen.getByLabelText(/Log out/i)

    expect(ariaLabel).toBeInTheDocument()
  })
})
