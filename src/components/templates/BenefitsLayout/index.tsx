import { useRouter } from 'next/router'

import PageLayout from '../PageLayout'

import { BenefitsContent, LayoutContainer } from './styles'
import { IProps } from './types'

import BenefitsHeader from '@/components/atoms/BenefitsHeader'
import { getBenefitBySlug } from '@/utils'

const BenefitsLayout = ({ children }: IProps) => {
  const router = useRouter()
  const { benefitSlug } = router.query

  const benefitsData = getBenefitBySlug(benefitSlug)

  return (
    <PageLayout
      pageTitle={`Benefits${benefitsData ? ` - ${benefitsData.title}` : ''}`}
    >
      <LayoutContainer>
        {!benefitSlug && <BenefitsHeader />}
        <BenefitsContent>{children}</BenefitsContent>
      </LayoutContainer>
    </PageLayout>
  )
}

export default BenefitsLayout
