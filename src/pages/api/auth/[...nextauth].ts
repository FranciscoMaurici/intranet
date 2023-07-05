import { NextApiRequest } from 'next'
import NextAuth, { Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { getUserData } from '../users/permissions'

import { IAdpToken } from '@/types'

export const getAuthOptions = (req, adpTokenData?: IAdpToken) => ({
  providers: [
    // Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    // QA accounts validations
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: {
          email: string
          password: string
        },
        req: NextApiRequest,
      ): Promise<null> {
        /*
      Manually log-in QA user.
        1. User must exist in the database.
        2. Login info should live in the env file.
       */
        if (
          process.env.NEXT_QA_ACCOUNT_EMAILS &&
          (!process.env.NEXT_QA_ACCOUNT_EMAILS.split(',').includes(
            credentials.email,
          ) ||
            credentials.password !== process.env.NEXT_QA_ACCOUNT_PASSWORD)
        )
          return

        try {
          const QAUserData = await fetch(
            `${req.headers.origin}/api/users/qa-data`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: credentials?.email }),
            },
          )

          if (!QAUserData) return null
          if (QAUserData.status === 500) throw new Error(QAUserData.statusText)

          /** TypeError: body used already for - should be able to extract twice
           * {@see} https://github.com/node-fetch/node-fetch/issues/533
           **/
          let data = null
          try {
            data = await QAUserData.json()
          } catch (e) {
            data = await QAUserData.text()
          }

          return data
        } catch (err) {
          console.error(err)
          throw new Error(err)
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, account }) {
      token.userData = await getUserData(token)
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      if (adpTokenData) {
        token.adpTokenData = adpTokenData
      }
      return token
    },
    session({ session, token }): Session {
      if (token?.userData) {
        session.user = { ...(token.userData as object), ...session.user }
      }
      return session
    },
  },
})

export default (req, res) => NextAuth(req, res, getAuthOptions(req))
