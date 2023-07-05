import { render, screen } from '@app-test-utils'

import LinearProgress from './index.tsx'

describe('LinearProgress', () => {
  test('should be rendered', () => {
    render(<LinearProgress />)
    const progressbar = screen.getByRole('progressbar')

    expect(progressbar).toBeInTheDocument()
  })
})
