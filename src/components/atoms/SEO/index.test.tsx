import { render } from '@app-test-utils'

import SEO from './index'

// Solution found in https://github.com/vercel/next.js/discussions/11060?sort=top#discussioncomment-33628

jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: Array<React.ReactElement> }) => (
    <>{children}</>
  ),
}))

describe('SEO', () => {
  test('should be rendered', () => {
    const title = 'Example page'
    render(<SEO title={title} />, {
      container: document.head,
    })

    expect(document.title).toBe(`Distillery Intranet - ${title}`)
  })
})
