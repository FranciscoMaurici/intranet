import axios from 'axios'
import { Agent } from 'https'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import sharp from 'sharp'

import { addSecondsToDate } from '../dates'

import { readToken } from './tokenManager'

import { getAuthOptions } from '@/pages/api/auth/[...nextauth]'
import { IAdpToken, IAdpWorker } from '@/types'

export const ADP_API_URL = 'https://api.adp.com'

export const getCertificatesAgent = () =>
  new Agent({
    cert: Buffer.from(process.env.ADP_CER, 'base64').toString(),
    key: Buffer.from(process.env.ADP_KEY, 'base64').toString(),
  })

const fetchToken = async () => {
  const response = await axios.post(
    `https://api.adp.com/auth/oauth/v2/token`,
    {
      client_id: process.env.ADP_CLIENT_ID,
      client_secret: process.env.ADP_CLIENT_SECRET,
      grant_type: 'client_credentials',
    },
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      httpsAgent: getCertificatesAgent(),
    },
  )
  return response.data
}

export const readAdpToken = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const userAgent = req.headers['user-agent']
  if (userAgent === 'Google-Cloud-Scheduler') {
    const { access_token } = await fetchToken()
    return access_token
  }
  const sessionToken = await readToken(req)
  const adpTokenData = sessionToken.adpTokenData as {
    value: string
    expirationTime: number
  }
  if (
    !adpTokenData ||
    !adpTokenData.value ||
    new Date().getTime() > adpTokenData.expirationTime
  ) {
    // Refetch token and save on session token
    const { access_token, expires_in } = await fetchToken()
    const expirationDate = addSecondsToDate(expires_in)
    const tokenData: IAdpToken = {
      value: access_token,
      expirationTime: expirationDate.getTime(),
    }
    await getServerSession(req, res, getAuthOptions(req, tokenData))
    return access_token
  } else {
    return adpTokenData.value
  }
}

export const getWorkerNameFormatted = (w: IAdpWorker) =>
  `${w.preferredFirstName || w.legalFirstName}${
    w.legalMiddleName ? ` ${w.legalMiddleName}` : ''
  } ${w.preferredLastName || w.legalLastName}`

export const getWorkerPhoto = async (photoUrl: string, token: string) => {
  const photoResponse = await axios.get(photoUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'arraybuffer',
    httpsAgent: getCertificatesAgent(),
  })
  if (photoResponse.data.length === 0) return null
  const imgBuffer = Buffer.from(photoResponse.data)
  const compressedImg = await sharp(imgBuffer).resize(100, 100).toBuffer()
  return compressedImg
}
