import { NextResponse } from 'next/server'

export async function middleware(req) {
  const { pathname } = req.nextUrl
  const [, firstUrlLevel, , thirdUrlLevel] = pathname.split('/')

  if (firstUrlLevel === 'benefits') {
    switch (pathname) {
      case '/benefits/fun-meetings':
      case '/benefits/enjoy/fun-meetings':
        return NextResponse.redirect(`${req.nextUrl.origin}/benefits/events`)
      case '/benefits/enjoy':
      case '/benefits/be-well':
      case '/benefits/connect':
      case '/benefits/learn-and-growth':
      case '/benefits/performance-bonus':
        return NextResponse.redirect(`${req.nextUrl.origin}/benefits`)
    }

    if (thirdUrlLevel) {
      return NextResponse.redirect(
        `${req.nextUrl.origin}/benefits/${thirdUrlLevel}`,
      )
    }
  }

  return NextResponse.next()
}
