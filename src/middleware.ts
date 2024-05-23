import { NextResponse } from 'next/server'

export function middleware() {
  const res = NextResponse.next()

  /**
   * Set the `Accept`, `Vary` and `Critical` to enable `Sec-CH-Prefers-Color-Scheme`.
   * We use this header to set the theme before rendering and avoid F.A.R.T.
   * @see [Docs for hint headers](https://web.dev/articles/user-preference-media-features-headers)
   * @see [Blog on FART](https://css-tricks.com/flash-of-inaccurate-color-theme-fart/)
   */
  const colorSchemeHeader = 'Sec-CH-Prefers-Color-Scheme'
  res.headers.set('Accept-CH', colorSchemeHeader)
  res.headers.set('Vary', colorSchemeHeader)
  res.headers.set('Critical-CH', colorSchemeHeader)

  return res
}
