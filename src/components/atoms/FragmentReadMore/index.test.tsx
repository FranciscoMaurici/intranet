import { render, screen } from '@app-test-utils'

import FragmentReadMore from './index'

describe('FragmentReadMore', () => {
  test('should be rendered', () => {
    render(
      <FragmentReadMore
        text="Some random text example"
        isExpanded
        ariaControl="someComponent"
      />,
    )

    const text = screen.getByText(/random/i)
    expect(text).toBeInTheDocument()
  })
})
