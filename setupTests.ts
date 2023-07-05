import { loadEnvConfig } from '@next/env'
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended'

import { PrismaClient } from '@prisma/client'

/** Official documentation
 * {@see https://testing-library.com/docs/ecosystem-jest-dom/}
 * {@see https://github.com/testing-library/jest-dom}
 */
import '@testing-library/jest-dom'

import prisma from './prisma'

window.history.pushState({}, 'Home page', '/')
loadEnvConfig(__dirname, true, { info: () => null, error: console.error })

jest.mock('next-auth/react', () => {
  const oriModule = jest.requireActual('next-auth/react')
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      email: 'sysadmin_intratest_user@distillery.com',
      password: process.env.NEXT_QA_ACCOUNT_PASSWORD,
    },
  }

  return {
    __esModule: true,
    ...oriModule,
    useSession: jest.fn(() => ({ data: mockSession, status: 'authenticated' })),
  }
})

jest.mock('./prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<{
  // this is needed to resolve the issue with circular types definition
  // https://github.com/prisma/prisma/issues/10203
  [K in keyof PrismaClient]: Omit<PrismaClient[K], 'groupBy'>
}>
