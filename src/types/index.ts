export * from './common.d'
export * from './open-positions.d'
export * from './announcements.d'
export * from './benefits.d'
export * from './celebrations.d'
export * from './leads.d'
export * from './comments.d'
export * from './handbook.d'
export * from './learning-path.d'
export * from './reactions.d'
export * from './adp.d'
export * from './user.d'
export * from './react-query.d'
export * from './messages.d'
export * from './permissions.d'
export * from './tech-interviews.d'

export interface IPaginationParams {
  pageSize?: number
  pageNum?: number
  orderBy?: string
  total?: number
}

export type IQueryCondition = {
  where: {
    OR?: Record<string, unknown>[]
    AND?: Record<string, unknown>[]
  }
}

export enum WHERE_CLAUSE_OPERATOR {
  OR = 'OR',
  AND = 'AND',
}

export type IEntityDeleteRequest = { id: number }
