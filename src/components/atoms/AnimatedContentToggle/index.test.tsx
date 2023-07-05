import { render, screen } from '@app-test-utils'

import AnimatedContentToggle from './index'

describe('AnimatedContentToggle', () => {
  test('should be rendered not expanded', () => {
    render(
      <AnimatedContentToggle
        isExpanded={false}
        initialHeight="0px"
        transition={{
          type: 'fade',
          stiffness: 100,
        }}
      >
        Test
      </AnimatedContentToggle>,
    )
    const article = screen.getByRole('article')

    expect(article).toBeInTheDocument()
  })
})
