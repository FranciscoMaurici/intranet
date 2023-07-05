import type { NextApiHandler } from 'next'

const responseHandler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    res.json({ data: 'Welcome to intranet API /' })
  } else {
    res.json({ data: 'Action not supported.' })
  }
}

export default responseHandler
