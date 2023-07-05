import { OpenPosition } from '@prisma/client'

import { IPaginationParams } from '.'

// OpenPosition GET all types
export type IOpenPositionGetAllRequest = Partial<
  Pick<OpenPosition, 'title' | 'client' | 'description'> & IPaginationParams
>

export type IOpenPositionGetAllResponse = {
  data: OpenPosition[]
  pagination: IPaginationParams
}

export type IOpenPositionPostPutRequest = Omit<
  OpenPosition,
  'id' | 'created_at' | 'updated_at' | 'is_open'
>

export type IOpenPositionPostPutResponse = OpenPosition

// OpenPosition DELETE types
export type IOpenPositionDeleteRequest = IOpenPositionPostPutRequest
export type IOpenPositionDeleteResponse = { message: 'Open position deleted' }
