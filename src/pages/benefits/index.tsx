import type { NextPage } from 'next'

import BenefitsCard from '@components/atoms/BenefitsCard'
import BenefitsLayout from '@components/templates/BenefitsLayout'
import benefits from '@data/benefits.json'

import FragmentText from '@/components/atoms/FragmentText'
import {
  BenefitSectionContent,
  BenefitSectionHeader,
  HorizonalDivider,
} from '@/components/templates/BenefitsLayout/styles'
import { DefaultActionPermission } from '@/types/enums/defaultActions'
import { DefaultUserModules } from '@/types/enums/defaultModules'
import usePermissions from '@/utils/hooks/usePermissions'

const BenefitsView: NextPage = () => {
  const { userCan } = usePermissions()

  if (!userCan(DefaultActionPermission.READ, DefaultUserModules.BENEFIT))
    return null

  return (
    <BenefitsLayout>
      <HorizonalDivider />
      {Object.keys(benefits).map(section => (
        <section key={section}>
          {benefits[section].title && (
            <BenefitSectionHeader>
              <FragmentText variant="headingSmall">
                {benefits[section].title}
              </FragmentText>
            </BenefitSectionHeader>
          )}
          <BenefitSectionContent key={`${section}_section`}>
            {benefits[section].benefits.map(
              benefit =>
                !benefit.hidden && (
                  <BenefitsCard key={`benefit_${benefit.id}`} {...benefit} />
                ),
            )}
          </BenefitSectionContent>
        </section>
      ))}
    </BenefitsLayout>
  )
}

export default BenefitsView
