import { addEntity, deleteEntity, updateEntity } from '../fetch'

import {
  IEntityKey,
  IMutationHandler,
  IMutationKeyToTypes,
  Mutations,
} from '@/types'

const singularEntities: Partial<Record<IEntityKey, string>> = {
  announcements: 'announcement',
  'open-positions': 'open position',
  benefits: 'benefit',
  comments: 'comment',
  reactions: 'reaction',
  handbook: 'handbook article',
}

export const getSuccessMsg = (entity: string, operation: string): string =>
  `The ${
    singularEntities[entity] || entity
  } has been ${operation}d successfully`
export const getErrorMsg = (entity: string, operation: string): string =>
  `An error occurred while trying to ${operation} the ${entity}`

const getMutationFunction = <MutationKey extends keyof IMutationKeyToTypes>(
  entityKey: IEntityKey,
  operation: string,
) => {
  switch (operation) {
    case 'create':
      return async (entity: IMutationKeyToTypes[MutationKey]['request']) => {
        const response = await addEntity(entityKey, entity)
        return response.data
      }
    case 'update':
      return async (entity: IMutationKeyToTypes[MutationKey]['request']) => {
        const response = await updateEntity(entityKey, entity)
        return response.data
      }
    case 'delete':
      return async (entity: IMutationKeyToTypes[MutationKey]['request']) => {
        const response = await deleteEntity(entityKey, entity)
        return response.data
      }
    default:
      throw new Error('Invalid operation')
  }
}

const getMutationValues = <MutationKey extends keyof IMutationKeyToTypes>(
  entityKey: IEntityKey,
  operation: string,
): IMutationHandler<MutationKey> => {
  const mutationFunction = getMutationFunction<MutationKey>(
    entityKey,
    operation,
  )

  return {
    mutationFunction,
    entityKey,
    errorMsg: getErrorMsg(entityKey, operation),
    successMsg: getSuccessMsg(entityKey, operation),
  }
}

export const MUTATION_VALUES = {
  // Announcement operations
  [Mutations.CREATE_ANNOUNCEMENT]: getMutationValues('announcements', 'create'),
  [Mutations.EDIT_ANNOUNCEMENT]: getMutationValues('announcements', 'update'),
  [Mutations.DELETE_ANNOUNCEMENT]: getMutationValues('announcements', 'delete'),

  // Position operations
  [Mutations.CREATE_POSITION]: getMutationValues('open-positions', 'create'),
  [Mutations.EDIT_POSITION]: getMutationValues('open-positions', 'update'),
  [Mutations.DELETE_POSITION]: getMutationValues('open-positions', 'delete'),

  // Benefit operations
  [Mutations.UPDATE_BENEFIT]: getMutationValues('benefits', 'update'),

  // Comment operations
  [Mutations.CREATE_COMMENT]: getMutationValues('comments', 'create'),
  [Mutations.DELETE_COMMENT]: getMutationValues('comments', 'delete'),

  // Announcement Reaction operations
  [Mutations.CREATE_ANNOUNCEMENT_REACTION]: getMutationValues(
    'reactions/announcement',
    'create',
  ),
  [Mutations.UPDATE_ANNOUNCEMENT_REACTION]: getMutationValues(
    'reactions/announcement',
    'update',
  ),
  [Mutations.DELETE_ANNOUNCEMENT_REACTION]: getMutationValues(
    'reactions/announcement',
    'delete',
  ),

  // Comment Reaction operations
  [Mutations.CREATE_COMMENT_REACTION]: getMutationValues(
    'reactions/comment',
    'create',
  ),
  [Mutations.UPDATE_COMMENT_REACTION]: getMutationValues(
    'reactions/comment',
    'update',
  ),
  [Mutations.DELETE_COMMENT_REACTION]: getMutationValues(
    'reactions/comment',
    'delete',
  ),

  // User Permissions operations
  [Mutations.UPDATE_USER_PERMISSIONS]: getMutationValues(
    'users/managepermissions',
    'create',
  ),

  // Handbook Article operations
  [Mutations.CREATE_HANDBOOK_ARTICLE]: getMutationValues('handbook', 'create'),
  [Mutations.UPDATE_HANDBOOK_ARTICLE]: getMutationValues('handbook', 'update'),
  [Mutations.DELETE_HANDBOOK_ARTICLE]: getMutationValues('handbook', 'delete'),
}
