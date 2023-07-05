import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'

import Benefit from '@components/organisms/Benefit'
import BenefitsLayout from '@components/templates/BenefitsLayout'

import { getBenefitBySlug } from '@/utils'
import { useGetEntityById } from '@/utils/hooks/useEntity'

const BenefitView: NextPage = ({
  benefitId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, isLoading } = useGetEntityById('benefits', benefitId)
  if (isLoading) return null

  return (
    <BenefitsLayout>
      <Benefit benefit={data?.benefit} />
    </BenefitsLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { benefitSlug } = ctx.params
  const benefitJSONData = getBenefitBySlug(benefitSlug)
  if (!benefitJSONData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      benefitId: benefitJSONData.id,
    },
  }
}

export default BenefitView
