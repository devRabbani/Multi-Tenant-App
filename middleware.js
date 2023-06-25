import { NextResponse } from 'next/server'

export default async function Middleware(req) {
  const url = req.nextUrl

  // Getting Hostname
  const hostname = req.headers.get('host')

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.test.com`, '')
      : hostname.replace(`.localhost:3000`, '')

  // Security prevent user from directly going to path /_sites
  if (url.pathname.startsWith('/_sites')) {
    url.pathname = '/404'
  } else {
    url.pathname = `/_sites/${currentHost}${url.pathname}`
  }
  console.log(currentHost)

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/', '/_sites/:path*'],
}
