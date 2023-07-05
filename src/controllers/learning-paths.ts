import type { NextApiHandler, NextApiResponse } from 'next'

import prisma from '@prisma'

import { ILearningPathGetAllResponse } from '@/types'
import { getSortBy } from '@/utils/pagination'

//#region Get learning paths methods
/**
 * @swagger
 * /api/learning-paths:
 *   get:
 *     summary: Get list of LearningPath items
 *     tags:
 *        - Learning Path
 *     responses:
 *       '200':
 *         description: Get LearningPath items successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ILearningPathGetAllResponse'
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */
export const getLearningPaths: NextApiHandler = async (
  _,
  res: NextApiResponse<ILearningPathGetAllResponse>,
) => {
  const learningPaths = await readLearningPaths()
  res.json(learningPaths)
}

export const readLearningPaths = async () => {
  const orderBy = getSortBy('stack_id: asc;seniority_id: asc')

  let learningPaths = await prisma.learningPath.findMany({
    orderBy,
    select: {
      id: true,
      name: true,
      description: true,
      playlist: true,
      stack_id: true,
      url: true,
      seniority: {
        select: {
          name: true,
        },
      },
      stack: {
        select: {
          id: true,
          name: true,
          department: {
            select: {
              id: true,
              name: true,
              stack: true,
            },
          },
        },
      },
    },
  })

  learningPaths = learningPaths.reduce(
    (accumulatedDepartment, currentValue) => {
      const department_id = currentValue.stack.department.id

      accumulatedDepartment[department_id] = accumulatedDepartment[
        department_id
      ] || {
        ...currentValue.stack.department,
        stack: [],
      }

      delete currentValue.stack.department
      accumulatedDepartment[department_id].stack.push(currentValue)
      return accumulatedDepartment
    },
    Object.create(null),
  )

  const departments = Object.keys(learningPaths).map(
    department_id => learningPaths[department_id],
  )

  departments.map(department => {
    department.stack = department.stack.reduce(
      (accumulatedStack, currentValue) => {
        accumulatedStack[currentValue.stack_id] = accumulatedStack[
          currentValue.stack_id
        ] || { ...currentValue.stack, paths: [] }
        const { stack, ...rest } = currentValue
        accumulatedStack[stack.id].paths.push({
          ...rest,
          isComplementary: rest.seniority.name.slice(-1) === '+',
        })
        return accumulatedStack
      },
      Object.create(null),
    )

    department.stack = Object.keys(department.stack).map(
      stack_id => department.stack[stack_id],
    )

    department.description = department.stack
      .map(stack => stack.name)
      .join(', ')
  })

  return [...departments]
}
