import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import prisma from '@prisma'
import { User } from '@prisma/client'
import {
  IAnnouncement, 
  IAnnouncementDeleteResponse,
  IAnnouncementGetAllRequest, 
  IAnnouncementGetAllResponse,
  IAnnouncementPostPutRequest,
  IAnnouncementPostPutResponse,
  IComment,
  IPaginationParams,
  IQueryCondition,
  WHERE_CLAUSE_OPERATOR,
} from '@tstypes'

import { ICommentReactionPreview, IReactionPreview } from '@/types/reactions'
import { validateEmptyStringProperties } from '@/utils/api/validator'
import { addQueryParams } from '@/utils/api/whereClauseManager'
import { getPaginate, getSortBy } from '@/utils/pagination'

//#region GET Announcements methods
/**
 * @swagger
 * /api/announcements:
 *   get:
 *     summary: Get list of Announcement items
 *     tags:
 *        - Announcement
 *     responses:
 *       '200':
 *         description: Get Announcement items successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IAnnouncementGetAllResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const getAnnouncements: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IAnnouncementGetAllResponse>,
) => {
  const params: IAnnouncementGetAllRequest = req.query
  const announcements = await readAnnouncements(params)
  res.json(announcements)
}

export const readAnnouncements = async (params: IAnnouncementGetAllRequest) => {
  const pagination: IPaginationParams = {
    pageNum: params.pageNum ? Number(params.pageNum) : 1,
    pageSize: params.pageSize ? Number(params.pageSize) : 100,
  }

  const whereClause: IQueryCondition = {
    where: {
      AND: [
        {
          status: { equals: true },
        },
      ],
    },
  }

  addQueryParams(whereClause, WHERE_CLAUSE_OPERATOR.OR, params, 'user_id')

  const orderBy = getSortBy(params.orderBy)
  const { skip, take } = getPaginate(pagination)

  const total = await prisma.announcement.count(whereClause)
  pagination.total = total

  const data = await prisma.announcement.findMany({
    orderBy,
    skip,
    take,
    ...whereClause,
    include: {
      comment: {
        select: {
          id: true,
          content: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
              jobTitle: { select: { name: true } },
            },
          },
          reaction_comment: {
            select: {
              id: true,
              reaction: {
                select: {
                  id: true,
                  name: true,
                  icon: true,
                },
              },
              status: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                  jobTitle: { select: { name: true } },
                },
              },
            },
            where: {
              status: true,
            },
          },
          created_at: true,
        },
        where: {
          status: true,
        },
      },
      reaction_announcement: {
        select: {
          id: true,
          reaction: {
            select: {
              id: true,
              name: true,
              icon: true,
            },
          },
          status: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
              jobTitle: { select: { name: true } },
            },
          },
        },
        where: {
          status: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  })

  const groupByReactionName = (items?: { reaction: IReactionPreview }[]) =>
    items?.reduce((acc, curr) => {
      const key = curr.reaction.name.toLowerCase()
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(curr)
      return acc
    }, Object.create(null))

  const typedData: IAnnouncement[] = data.map(announcement => {
    const { comment, reaction_announcement, ...rest } = announcement

    const reactionsByGroup = groupByReactionName(reaction_announcement)

    const comments: IComment[] =
      comment?.map(c => {
        const reactionsByGroup = groupByReactionName(c.reaction_comment)
        const reactionComments: ICommentReactionPreview[] =
          c.reaction_comment?.map(rc => ({
            id: rc.id,
            status: rc.status,
            reaction: {
              id: rc.reaction.id,
              name: rc.reaction.name,
              icon: rc.reaction.icon,
            },
            user: {
              id: rc.user.id,
              name: rc.user.name,
              avatar: rc.user.avatar,
              jobTitle: {
                name: rc.user.jobTitle?.name,
              },
            },
          })) || []

        return {
          ...c,
          reactionsByGroup,
          announcement_id: announcement.id,
          reaction_comment: reactionComments,
        }
      }) || []

    return {
      ...rest,
      comments,
      reactionsByGroup,
      reaction_announcement,
    }
  })

  return { data: typedData, pagination }
}

//#endregion

//#region POST Announcement methods
/**
 *  @swagger
 *  /api/announcements:
 *    post:
 *      summary: Create a Announcement item
 *      tags:
 *        - Announcement
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IAnnouncementPostPutRequest'
 *      responses:
 *        '200':
 *          description: The Announcement item was created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IAnnouncementPostPutResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/
export const postAnnouncement = async (
  req: NextApiRequest,
  res: NextApiResponse<IAnnouncementPostPutResponse>,
) => {
  const data: IAnnouncementPostPutRequest = req.body
  const requiredProperties = ['user_id']
  const validationResponse = validateEmptyStringProperties(
    data,
    ...requiredProperties,
  )
  if (validationResponse.objectIsValid && data.content.length > 15) {
    const announcement = await createAnnouncement(data)
    await prisma.$disconnect()
    res.json(announcement)
  } else {
    res
      .status(400)
      .end(validationResponse.errorMessage || 'The content field is missing')
  }
}

const createAnnouncement = async (data: IAnnouncementPostPutRequest) =>
  await prisma.announcement.create({
    data: {
      ...data,
      last_updated_by: data.user_id,
    },
  })

//#endregion

//#region PUT Announcement methods
/**
 *  @swagger
 *  /api/announcements/{id}:
 *    put:
 *      summary: Update Announcement item by ID
 *      tags:
 *        - Announcement
 *      parameters:
 *        - $ref: '#/components/parameters/id'
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IAnnouncementPostPutRequest'
 *      responses:
 *        '200':
 *          description: The Announcement item was updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IAnnouncementPostPutResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/
export const putAnnouncement: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IAnnouncementPostPutResponse>,
) => {
  const id = Number(req.query.id)
  const data: IAnnouncementPostPutRequest = req.body
  const requiredProperties = ['user_id']
  const validationResponse = validateEmptyStringProperties(
    data,
    ...requiredProperties,
  )
  if (validationResponse.objectIsValid && data.content.length > 15) {
    const { userData } = await getToken({ req })
    const announcement = await prisma.announcement.update({
      where: { id },
      data: { content: data.content, last_updated_by: (userData as User).id },
    })
    await prisma.$disconnect()
    res.json(announcement)
  } else {
    res
      .status(400)
      .end(validationResponse.errorMessage || 'The content field is missing')
  }
}

//#endregion

//#region DELETE Announcement methods
/**
 *  @swagger
 *  /api/announcements/{id}:
 *    delete:
 *      summary: Delete Announcement item by ID
 *      tags:
 *        - Announcement
 *      description: >-
 *        API to delete an Announcement item, this is only a soft delete changing the status
 *      parameters:
 *        - $ref: '#/components/parameters/id'
 *      responses:
 *        '200':
 *            description: The Announcement item was deleted successfully
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/IAnnouncementDeleteResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/
export const deleteAnnouncement = async (
  req: NextApiRequest,
  res: NextApiResponse<IAnnouncementDeleteResponse>,
) => {
  const id = Number(req.query.id)
  await prisma.announcement.update({
    where: { id },
    data: {
      status: false,
      comment: {
        updateMany: {
          where: {
            status: true,
          },
          data: {
            status: false,
          },
        },
      },
    },
    include: { comment: true },
  })

  res.json({ message: 'Announcement deleted' })
}

//#endregion
