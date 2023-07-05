import { IBenefitGetByIdResponse } from '@/types'

export type IProps = IBenefitGetByIdResponse

export interface BenefitFormValues {
  benefitContent: BenefitContent
}

export interface BenefitContent {
  type: string
  content: []
}
