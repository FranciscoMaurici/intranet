import type { NextApiRequest, NextApiResponse } from 'next'

const validateContentType = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next,
) => {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(415).json({
      message: 'Content-type not supported',
    })
  }

  next()
}

export default validateContentType
