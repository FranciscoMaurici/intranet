import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import prisma from '@prisma'
import {
  ICommentDeleteResponse,
  ICommentPostRequest,
  ICommentPostResponse,
} from '@tstypes'

import { validateFields } from '@/utils/api/validator'

const requiredFields = ['announcement_id', 'user_id', 'content']

/**
 *  @swagger
 *  /api/comments:
 *    post:
 *      summary: Create a Comment item
 *      tags:
 *        - Comment
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ICommentPostRequest'
 *      responses:
 *        '200':
 *          description: The Comment item was created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ICommentPostResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/
export const postComment: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ICommentPostResponse>,
) => {
  const data: ICommentPostRequest = req.body
  const { isValid, errorMsg } = validateFields(requiredFields, data)

  if (!isValid) res.status(400).end(errorMsg)

  try {
    const comment = await prisma.comment.create({
      data: {
        announcement_id: data.announcement_id,
        content: data.content,
        user_id: data.user_id,
      },
    })
    await prisma.$disconnect()
    res.json(comment)
  } catch (error) {
    throw new Error(error)
  }
}

//#region Delete position methods
/**
 *  @swagger
 *  /api/comments/{id}:
 *    delete:
 *      summary: Delete Comment item by ID
 *      tags:
 *        - Comment
 *      description: >-
 *        API to delete a Comment item, this is only a soft delete changing the status
 *      parameters:
 *        - $ref: '#/components/parameters/id'
 *      responses:
 *        '200':
 *            description: The Comment item was deleted successfully
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/ICommentDeleteResponse'
 *        '400':
 *          $ref: '#/components/responses/400'
 *        '401':
 *          $ref: '#/components/responses/401'
 */ /***/
export const deleteComment: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ICommentDeleteResponse>,
) => {
  const id = Number(req.query.id)
  await prisma.comment.update({
    where: { id },
    data: {
      status: false,
    },
  })
  res.json({ message: 'Comment deleted' })
}
