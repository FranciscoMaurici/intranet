import { render, screen, waitFor } from '@app-test-utils'

import '../../../__tests__/router-mock'

import BenefitsCard from './index'

describe('BenefitsCard', () => {
  describe('render', () => {
    const props = {
      title: 'Title',
      description: 'Description',
      slug: 'events',
      hasMoreDetails: true,
    }
    beforeEach(() => {
      render(<BenefitsCard {...props} />)
    })

    it('should render h4 heading with passed text', () => {
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
        props.title,
      )
    })
    it('should render passed description', () => {
      expect(screen.getByText(props.description)).toBeInTheDocument()
    })
    it('should have passed slug icon', async () => {
      await waitFor(() => {
        expect(screen.getByAltText('benefit-card-icon')).toHaveAttribute(
          'src',
          `/images/benefits-icons/${props.slug}.svg`,
        )
      })
    })
    it('should have correct more details href link', () => {
      expect(screen.getByRole('link')).toHaveAttribute('href', `/${props.slug}`)
    })
  })
})
