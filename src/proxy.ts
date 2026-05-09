import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { localeCodes, defaultLocaleCode, type LocaleCode } from '@/config/locales'

function detectLocale(request: NextRequest): LocaleCode {
  const cookieLocale = request.cookies.get('locale')?.value
  if (cookieLocale && localeCodes.includes(cookieLocale as LocaleCode)) {
    return cookieLocale as LocaleCode
  }

  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const browserLocale = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0]?.trim().slice(0, 2).toLowerCase())
    .find((lang) => localeCodes.includes(lang as LocaleCode))

  if (browserLocale) return browserLocale as LocaleCode

  return defaultLocaleCode
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (request.headers.get('x-proxy-bypass') === '1') {
    return NextResponse.next()
  }

  const pathnameLocale = pathname.split('/')[1]
  const hasLocale = localeCodes.includes(pathnameLocale as LocaleCode)

  if (hasLocale) {
    return NextResponse.next()
  }

  const looksLikeLocale = /^[a-z]{2}$/.test(pathnameLocale)
  if (looksLikeLocale) {
    const locale = detectLocale(request)
    const segments = pathname.split('/')
    const restPath = segments.slice(2).join('/')
    const cleanPath = restPath ? `/${restPath}` : ''
    return NextResponse.redirect(new URL(`/${locale}${cleanPath}`, request.url), 307)
  }

  const locale = detectLocale(request)
  const redirectUrl = new URL(`/${locale}${pathname}`, request.url)
  redirectUrl.search = request.nextUrl.search
  return NextResponse.redirect(redirectUrl, 307)
}

export const config = {
  matcher: ['/((?!_next|api|admin|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)'],
}
