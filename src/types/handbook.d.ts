import { Handbook } from '@prisma/client'

export type IArticle = Handbook & {
  children: IArticle[]
}

export type IHandbookGetAllResponse = IArticle[]

export type IHandbookGetByIdResponse = Handbook

export type IHandbookPostPutRequest = Omit<
  Handbook,
  'id' | 'created_at' | 'updated_at' | 'menu_index' | 'status'
>
export type IHandbookPostPutResponse = Handbook

export interface IHandbookDeleteResponse {
  message?: 'Handbook deleted'
  error?: string
}
