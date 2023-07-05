import { Module } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    expires: unknown
    user: {
      id: string
      name: string
      username: string
      image: string
      email: string
      modulePermission: {
        [key: string]: Module
      }[]
    }
    [key: string]: string
  }
}
