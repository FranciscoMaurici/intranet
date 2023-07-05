import { Request, Response } from 'express'
import type { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line import/named
import { createRequest, createResponse } from 'node-mocks-http'

type CustomNextApiRequest = NextApiRequest & Request
type CustomNextApiResponse<U> = NextApiResponse<U> & Response<unknown, U>

export function createMockedRequest<T = unknown, U = unknown>({
  query = {},
  body,
  headers = {},
}: {
  query?: { [key: string]: string }
  body?: T
  headers?: { [key: string]: string }
}) {
  const req = createRequest<CustomNextApiRequest>({
    query,
    body,
    headers,
  })

  const res = createResponse<CustomNextApiResponse<U>>()

  const next = jest.fn()

  return { req, res, next }
}
