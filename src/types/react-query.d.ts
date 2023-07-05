import {
  IAnnouncementDeleteRequest,
  IAnnouncementDeleteResponse,
  IAnnouncementGetAllResponse,
  IAnnouncementPostPutRequest,
  IAnnouncementPostPutResponse,
  IBenefitPutRequest,
  IBenefitPutResponse,
  ICelebrationGetAllResponse,
  ICommentDeleteResponse,
  ICommentPostRequest,
  ICommentPostResponse,
  IEntityDeleteRequest,
  IHandbookGetAllResponse,
  IHandbookPostPutRequest,
  IHandbookPostPutResponse,
  ILearningPathGetAllResponse,
  IOpenPositionDeleteRequest,
  IOpenPositionDeleteResponse,
  IOpenPositionGetAllResponse,
  IOpenPositionPostPutRequest,
  IOpenPositionPostPutResponse,
  IPermissionsPostPutRequest,
  IPermissionsPostPutResponse,
  IReactionAnnouncementPostPutRequest,
  IReactionAnnouncementPostPutResponse,
  IReactionCommentPostPutRequest,
  IReactionCommentPostPutResponse,
  IReactionGetAllResponse,
  UserState,
} from './'

export enum Mutations {
  // Announcement mutations
  CREATE_ANNOUNCEMENT = 'CREATE_ANNOUNCEMENT',
  EDIT_ANNOUNCEMENT = 'EDIT_ANNOUNCEMENT',
  DELETE_ANNOUNCEMENT = 'DELETE_ANNOUNCEMENT',

  // Position mutations
  CREATE_POSITION = 'CREATE_POSITION',
  EDIT_POSITION = 'EDIT_POSITION',
  DELETE_POSITION = 'DELETE_POSITION',

  // Benefit mutation
  UPDATE_BENEFIT = 'UPDATE_BENEFIT',

  // Comment mutations
  CREATE_COMMENT = 'CREATE_COMMENT',
  DELETE_COMMENT = 'DELETE_COMMENT',

  // Announcement Reaction mutations
  CREATE_ANNOUNCEMENT_REACTION = 'CREATE_ANNOUNCEMENT_REACTION',
  UPDATE_ANNOUNCEMENT_REACTION = 'UPDATE_ANNOUNCEMENT_REACTION',
  DELETE_ANNOUNCEMENT_REACTION = 'DELETE_ANNOUNCEMENT_REACTION',

  // Comment Reaction mutations
  CREATE_COMMENT_REACTION = 'CREATE_COMMENT_REACTION',
  UPDATE_COMMENT_REACTION = 'UPDATE_COMMENT_REACTION',
  DELETE_COMMENT_REACTION = 'DELETE_COMMENT_REACTION',

  // User permissions mutation
  UPDATE_USER_PERMISSIONS = 'UPDATE_USER_PERMISSIONS',

  // Handbook Article mutation
  CREATE_HANDBOOK_ARTICLE = 'CREATE_HANDBOOK_ARTICLE',
  UPDATE_HANDBOOK_ARTICLE = 'UPDATE_HANDBOOK_ARTICLE',
  DELETE_HANDBOOK_ARTICLE = 'DELETE_HANDBOOK_ARTICLE',
}

// Each key corresponds to an API endpoint and its value is the type of response that the API returns.
export interface IQueryKeyToResponse {
  announcements: IAnnouncementGetAllResponse
  reactions: IReactionGetAllResponse
  celebrations: ICelebrationGetAllResponse
  handbook: IHandbookGetAllResponse
  'learning-paths': ILearningPathGetAllResponse
  'open-positions': IOpenPositionGetAllResponse
  'users/managepermissions': UserState[] // TODO: Type users/managepermissions correctly
  'users/managepermissionstable'
  // add more as needed
  // 'other-entity': IOtherEntityResponse
}

/**
 * This interface defines the request and response types for each mutation in the application.
 *
 * Each key corresponds to a mutation type, and its value is an object containing
 * the types of the request and response associated with that mutation. This setup provides a robust
 * type safety across all mutations in our application and allows us to take full advantage of TypeScript's powerful type inference.
 *
 * As a result, any part of our application that triggers these mutations will have clear expectations on what
 * data to provide as input (request) and what data structure to anticipate in return (response).
 *
 * Note: While initially setting up or when uncertain about the exact shape of the request or response for a
 * specific mutation, it might be tempting to use 'unknown'. However, this should be avoided as it undermines
 * the benefits of type safety. The types for each mutation should be defined accurately to ensure more reliable,
 * readable, and maintainable code. In scenarios where the exact type is uncertain, it is advisable to spend the
 * required time to investigate and define the correct types.
 */
export interface IMutationKeyToTypes {
  // Announcement mutations
  [Mutations.CREATE_ANNOUNCEMENT]: {
    response: IAnnouncementPostPutResponse
    request: IAnnouncementPostPutRequest
  }
  [Mutations.EDIT_ANNOUNCEMENT]: {
    response: IAnnouncementPostPutResponse
    request: IAnnouncementPostPutRequest
  }
  [Mutations.DELETE_ANNOUNCEMENT]: {
    response: IAnnouncementDeleteResponse
    request: IAnnouncementDeleteRequest
  }

  // Open Position mutations
  [Mutations.CREATE_POSITION]: {
    response: IOpenPositionPostPutResponse
    request: IOpenPositionPostPutRequest
  }
  [Mutations.EDIT_POSITION]: {
    response: IOpenPositionPostPutResponse
    request: IOpenPositionPostPutRequest
  }
  [Mutations.DELETE_POSITION]: {
    response: IOpenPositionDeleteResponse
    request: IOpenPositionDeleteRequest
  }

  // Benefit mutation
  [Mutations.UPDATE_BENEFIT]: {
    response: IBenefitPutResponse
    request: IBenefitPutRequest
  }

  // Comment mutations
  [Mutations.CREATE_COMMENT]: {
    response: ICommentPostResponse
    request: ICommentPostRequest
  }
  [Mutations.DELETE_COMMENT]: {
    response: ICommentDeleteResponse
    request: IEntityDeleteRequest
  }

  // Announcement Reaction mutations
  [Mutations.CREATE_ANNOUNCEMENT_REACTION]: {
    response: IReactionAnnouncementPostPutResponse
    request: IReactionAnnouncementPostPutRequest
  }
  [Mutations.UPDATE_ANNOUNCEMENT_REACTION]: {
    response: IReactionAnnouncementPostPutResponse
    request: IReactionAnnouncementPostPutRequest
  }
  [Mutations.DELETE_ANNOUNCEMENT_REACTION]: {
    response: void
    request: IEntityDeleteRequest
  }

  // Comment Reaction mutations
  [Mutations.CREATE_COMMENT_REACTION]: {
    response: IReactionCommentPostPutResponse
    request: IReactionCommentPostPutRequest
  }
  [Mutations.UPDATE_COMMENT_REACTION]: {
    response: IReactionCommentPostPutResponse
    request: IReactionCommentPostPutRequest
  }
  [Mutations.DELETE_COMMENT_REACTION]: {
    response: ICommentDeleteResponse
    request: IEntityDeleteRequest
  }

  // User permissions mutation
  [Mutations.UPDATE_USER_PERMISSIONS]: {
    response: IPermissionsPostPutResponse
    request: IPermissionsPostPutRequest
  }

  // Handbook Article mutation
  [Mutations.CREATE_HANDBOOK_ARTICLE]: {
    response: IHandbookPostPutResponse
    request: IHandbookPostPutRequest
  }
  [Mutations.UPDATE_HANDBOOK_ARTICLE]: {
    response: IHandbookPostPutResponse
    request: IHandbookPostPutRequest
  }
  [Mutations.DELETE_HANDBOOK_ARTICLE]: {
    response: IHandbookDeleteResponse
    request: object
  }
  // Add more entries here for your other mutations
}

export interface IMutationHandler<
  MutationKey extends keyof IMutationKeyToTypes,
> {
  mutationFunction: (
    entity: IMutationKeyToTypes[MutationKey]['request'],
  ) => Promise<IMutationKeyToTypes[MutationKey]['response']>
  entityKey: string
  errorMsg: string
  successMsg: string
}

export type IEntityKey =
  | 'announcements'
  | 'open-positions'
  | 'benefits'
  | 'comments'
  | 'reactions/announcement'
  | 'reactions/comment'
  | 'users/managepermissions'
  | 'handbook'
  | 'reactions'
