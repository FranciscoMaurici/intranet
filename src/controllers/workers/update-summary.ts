import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import prisma from '@prisma'

export const getUpdateSummary: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT 
        AVG(TIMESTAMPDIFF(SECOND, started_at, finished_at)) average_execution_time,
        MAX(finished_at) last_execution_timestamp
      FROM workers_update_dates
      ORDER BY finished_at DESC
      LIMIT 5
    `
    const data = result[0] || null
    if (data.average_execution_time) {
      data.average_execution_time = parseInt(data.average_execution_time, 10)
    }
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
