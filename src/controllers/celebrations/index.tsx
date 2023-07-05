import dayjs, { Dayjs } from 'dayjs'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import prisma from '@prisma'
import { Celebration } from '@prisma/client'

import { ICelebrationGetAllRequest, ICelebrationGetAllResponse } from '@/types'
import { getFormattedDateString } from '@/utils/dates'

const getDateValues = (userLocalToday: Dayjs) => {
  const userLocalTomorrow = userLocalToday.add(1, 'day')
  return {
    todaysDate: userLocalToday.date(),
    todaysMonth: userLocalToday.month() + 1,
    tomorrowsDate: userLocalTomorrow.date(),
    tomorrowsMonth: userLocalTomorrow.month() + 1,
    userLocalTodayFormattedString: getFormattedDateString(userLocalToday),
    userLocalTomorrowFormattedString: getFormattedDateString(userLocalTomorrow),
  }
}

function getCelebrationData(
  celebration: Celebration,
  userLocalToday: Dayjs,
): {
  type: 'birthday' | 'anniversary'
  dateKey: string
  years_difference: number
} {
  const {
    todaysDate,
    todaysMonth,
    tomorrowsDate,
    tomorrowsMonth,
    userLocalTodayFormattedString,
    userLocalTomorrowFormattedString,
  } = getDateValues(userLocalToday)

  const {
    birth_date_day: birthDate,
    birth_date_month: birthMonth,
    hire_date_day: hireDate,
    hire_date_month: hireMonth,
  } = celebration
  let { years_difference } = celebration

  let type, dateKey, yearsDifference

  switch (true) {
    case birthDate === todaysDate && birthMonth === todaysMonth:
      type = 'birthday'
      dateKey = userLocalTodayFormattedString
      yearsDifference = years_difference
      break
    case birthDate === tomorrowsDate && birthMonth === tomorrowsMonth:
      type = 'birthday'
      dateKey = userLocalTomorrowFormattedString
      yearsDifference = years_difference++
      break
    case hireDate === todaysDate && hireMonth === todaysMonth:
      type = 'anniversary'
      dateKey = userLocalTodayFormattedString
      yearsDifference = years_difference
      break
    case hireDate === tomorrowsDate && hireMonth === tomorrowsMonth:
      type = 'anniversary'
      dateKey = userLocalTomorrowFormattedString
      yearsDifference = years_difference++
      break
  }

  return {
    type,
    dateKey,
    years_difference: yearsDifference,
  }
}

/**
 * @swagger
 * /api/celebrations:
 *   get:
 *     summary: Get list of Celebration items
 *     tags:
 *        - Celebration
 *     parameters:
 *        - in: query
 *          name: date
 *          schema:
 *            type: string
 *            example: "2023-01-01"
 *          required: true
 *          description: The date to filter celebrations
 *     responses:
 *       '200':
 *         description: |
 *           Get Celebration items successfully.
 *           Note: The example response is hardcoded because the schema $ref was not working.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     job_title:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                     avatar_file:
 *                       type: string
 *                       format: byte
 *                     years_difference:
 *                       type: integer
 *                       format: int32
 *                     type:
 *                       type: string
 *                       enum: [birthday, anniversary]
 *               example:
 *                 "2023-01-01":
 *                   - name: "John Doe"
 *                     job_title: "Software Engineer"
 *                     avatar: "http://example.com/avatar.jpg"
 *                     avatar_file: "Base64 encoded string"
 *                     years_difference: 1
 *                     type: "birthday"
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 */ /***/
export const getCelebrations: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ICelebrationGetAllResponse>,
) => {
  const { date } = req.query as ICelebrationGetAllRequest
  const userLocalToday = dayjs(date)
  const {
    todaysDate,
    todaysMonth,
    tomorrowsDate,
    tomorrowsMonth,
    userLocalTodayFormattedString,
    userLocalTomorrowFormattedString,
  } = getDateValues(userLocalToday)

  const celebrations: ICelebrationGetAllResponse = {
    [userLocalTodayFormattedString]: [],
    [userLocalTomorrowFormattedString]: [],
    // e.g {'5/14/2023': [], '5/15/2023': []}
  }

  const celebrationsDB = await prisma.celebration.findMany({
    where: {
      OR: [
        // Check if the user's birth_date matches today's or tomorrow's date and month
        {
          AND: [
            { birth_date_day: { equals: todaysDate } },
            { birth_date_month: { equals: todaysMonth } },
          ],
        },
        {
          AND: [
            { birth_date_day: { equals: tomorrowsDate } },
            { birth_date_month: { equals: tomorrowsMonth } },
          ],
        },
        // Check if the user's hire_date matches today's or tomorrow's date and month
        {
          AND: [
            { hire_date_day: { equals: todaysDate } },
            { hire_date_month: { equals: todaysMonth } },
          ],
        },
        {
          AND: [
            { hire_date_day: { equals: tomorrowsDate } },
            { hire_date_month: { equals: tomorrowsMonth } },
          ],
        },
      ],
    },
  })

  for (const celebration of celebrationsDB) {
    const { type, dateKey, years_difference } = getCelebrationData(
      celebration,
      userLocalToday,
    )

    if (type === 'anniversary' && years_difference === 0) {
      // We don't want to show 0 anniversaries (people that just entered the company today)
      continue
    }

    celebrations[dateKey].push({
      ...celebration,
      type,
      years_difference: Number(years_difference),
    })
  }

  res.json(celebrations)
}
