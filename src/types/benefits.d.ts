import { Benefit } from '@prisma/client'

export type IBenefit404ErrorResponse = { message: 'Benefit not found' }

// GET all Benefits
export type IBenefitGetAllResponse = { benefits: Benefit[] }

// GET Benefit by ID
export type IBenefitGetByIdResponse = { benefit: Benefit }

// PUT Benefit by ID
export type IBenefitPutRequest = Partial<
  Omit<Benefit, 'created_at' | 'updated_at'>
>
export type IBenefitPutResponse = { benefit: Benefit }
