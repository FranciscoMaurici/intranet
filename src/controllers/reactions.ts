import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import prisma from '@prisma'

import { IQueryCondition } from '@/types'
import {
  IReactionAnnouncementDeleteResponse,
  IReactionAnnouncementPostPutRequest,
  IReactionAnnouncementPostPutResponse,
  IReactionCommentDeleteResponse,
  IReactionCommentPostPutRequest,
  IReactionCommentPostPutResponse,
  IReactionGetAllResponse,
} from '@/types/reactions'
import { validateFields } from '@/utils/api/validator'

const requiredFields = ['user_id', 'reaction_id']

//#region GET All Reaction types
/**
 * @swagger
 * /api/reactions:
 *   get:
 *     summary: Get all Reaction Types
 *     tags:
 *       - Reaction
 *     responses:
 *       '200':
 *         description: Get Reaction Types successfully
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/IReactionGetAllResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const getReactionTypes: NextApiHandler = async (
  _,
  res: NextApiResponse<IReactionGetAllResponse>,
) => {
  const reactions = await readReactionTypes()
  res.json(reactions)
}

export const readReactionTypes = async () => {
  const whereClause: IQueryCondition = {
    where: {
      AND: [
        {
          status: { equals: true },
        },
      ],
    },
  }

  const data = await prisma.reaction.findMany({
    ...whereClause,
  })

  return data
}
//#endregion

//#region Post Announcement Reaction method
/**
 * @swagger
 * /api/reactions/announcement:
 *   post:
 *     summary: Post a Reaction Announcement
 *     tags:
 *       - Reaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IReactionAnnouncementPostPutRequest'
 *     responses:
 *       '200':
 *         description: Post Reaction successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IReactionAnnouncementPostPutResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const postAnnouncementReaction: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IReactionAnnouncementPostPutResponse>,
) => {
  const data: IReactionAnnouncementPostPutRequest = req.body
  let { isValid, errorMsg } = validateFields(requiredFields, data)

  if (!data.announcement_id) {
    isValid = false
    errorMsg = 'The field announcement_id is missing in the request body'
  }

  if (!isValid) res.status(400).end(errorMsg)

  try {
    const existingReaction = await prisma.reactionAnnouncement.findFirst({
      where: {
        announcement_id: data.announcement_id,
        user_id: data.user_id,
      },
      select: {
        id: true,
      },
    })

    let reaction

    if (!existingReaction) {
      reaction = await prisma.reactionAnnouncement.create({
        data: {
          announcement_id: data.announcement_id,
          user_id: data.user_id,
          reaction_id: data.reaction_id,
        },
      })
    } else {
      reaction = await prisma.reactionAnnouncement.update({
        where: { id: existingReaction.id },
        data: { reaction_id: data.reaction_id, status: true },
      })
    }

    res.json(reaction)
  } catch (error) {
    throw new Error(error)
  }
}

//#endregion

//#region Post Comment Reaction method
/**
 * @swagger
 * /api/reactions/comment:
 *   post:
 *     summary: Post a Reaction Comment
 *     tags:
 *       - Reaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IReactionCommentPostPutRequest'
 *     responses:
 *       '200':
 *         description: Post Reaction successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IReactionCommentPostPutResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const postCommentReaction: NextApiHandler<
  IReactionCommentPostPutResponse
> = async (
  req: NextApiRequest,
  res: NextApiResponse<IReactionCommentPostPutResponse>,
) => {
  const data: IReactionCommentPostPutRequest = req.body
  let { isValid, errorMsg } = validateFields(requiredFields, data)

  if (!data.comment_id) {
    isValid = false
    errorMsg = 'The field comment_id is missing in the request body'
  }

  if (!isValid) res.status(400).end(errorMsg)

  try {
    const existingReaction = await prisma.reactionComment.findFirst({
      where: {
        comment_id: data.comment_id,
        user_id: data.user_id,
      },
      select: {
        id: true,
      },
    })

    let reaction

    if (!existingReaction) {
      reaction = await prisma.reactionComment.create({
        data: {
          comment_id: data.comment_id,
          user_id: data.user_id,
          reaction_id: data.reaction_id,
        },
      })
    } else {
      reaction = await prisma.reactionComment.update({
        where: { id: existingReaction.id },
        data: { reaction_id: data.reaction_id, status: true },
      })
    }

    res.json(reaction)
  } catch (error) {
    throw new Error(error)
  }
}

//#endregion

//#region Put Announcement Reaction method
/**
 * @swagger
 * /api/reactions/announcement/{id}:
 *   put:
 *     summary: Update a Reaction Announcement
 *     tags:
 *       - Reaction
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IReactionAnnouncementPostPutRequest'
 *     responses:
 *       '200':
 *         description: Update Reaction successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IReactionAnnouncementPostPutResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const putAnnouncementReaction: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { id } = req.query
  const data: IReactionAnnouncementPostPutRequest = req.body

  const { isValid, errorMsg } = validateFields(['reaction_id'], data)

  if (!isValid) return res.status(400).end(errorMsg)

  try {
    const reaction = await prisma.reactionAnnouncement.update({
      where: { id: Number(id) },
      data: { reaction_id: data.reaction_id, status: true },
    })

    res.json(reaction)
  } catch (error) {
    throw new Error(error)
  }
}

//#endregion

//#region Put Comment Reaction method
/**
 * @swagger
 * /api/reactions/comment/{id}:
 *   put:
 *     summary: Update a Reaction Comment
 *     tags:
 *       - Reaction
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IReactionCommentPostPutRequest'
 *     responses:
 *       '200':
 *         description: Update Reaction successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IReactionCommentPostPutResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const putCommentReaction: NextApiHandler<
  IReactionCommentPostPutResponse
> = async (
  req: NextApiRequest,
  res: NextApiResponse<IReactionCommentPostPutResponse>,
) => {
  const { id } = req.query
  const data: IReactionCommentPostPutRequest = req.body

  const { isValid, errorMsg } = validateFields(['reaction_id'], data)

  if (!isValid) return res.status(400).end(errorMsg)

  try {
    const reaction = await prisma.reactionComment.update({
      where: { id: Number(id) },
      data: { reaction_id: data.reaction_id, status: true },
    })

    res.json(reaction)
  } catch (error) {
    throw new Error(error)
  }
}

//#endregion

//#region Delete Announcement Reaction method
/**
 * @swagger
 * /api/reactions/announcement/{id}:
 *   delete:
 *     summary: Delete an Announcement Reaction
 *     tags:
 *       - Reaction
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Delete Reaction successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IReactionAnnouncementDeleteResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */
export const deleteAnnouncementReaction: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IReactionAnnouncementDeleteResponse>,
) => {
  const { id } = req.query
  await prisma.reactionAnnouncement.update({
    where: { id: Number(id) },
    data: {
      status: false,
    },
  })
  res.json({ message: 'Reaction Announcement deleted' })
}
//#endregion

//#region Delete Comment Reaction method
/**
 * @swagger
 * /api/reactions/comment/{id}:
 *   delete:
 *     summary: Delete a Comment Reaction
 *     tags:
 *       - Reaction
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Delete Reaction successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IReactionCommentDeleteResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */
export const deleteCommentReaction: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IReactionCommentDeleteResponse>,
) => {
  const { id } = req.query
  await prisma.reactionComment.update({
    where: { id: Number(id) },
    data: {
      status: false,
    },
  })
  res.json({ message: 'Reaction Comment deleted' })
}
//#endregion
