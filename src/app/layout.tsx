import { GeistSans } from 'geist/font/sans'
import { CookiesProvider } from 'next-client-cookies/server'
import { cookies, headers } from 'next/headers'
import type { PropsWithChildren } from 'react'
import { cn } from '~/lib/utils'
import ogImage from './opengraph-image.jpg'
import './theme.css'
import twitterImage from './twitter-image.jpg'

import type { Metadata } from 'next'
import { env } from '~/env'

const title = 'MoneyLion Feed'
const description = 'Feed app example developed as a Challenge for MoneyLion by @wesleycoder'

export const metadata: Metadata = {
  metadataBase: new URL(env.APP_URL),
  icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' }],
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    creator: '@wesleycoder',
    creatorId: 'wesleycoder',
    title,
    description,
    site: new URL(env.APP_URL).hostname,
    images: [
      {
        url: twitterImage.src,
        alt: title,
        width: twitterImage.width,
        height: twitterImage.height,
      },
    ],
  },
  openGraph: {
    type: 'website',
    description,
    title,
    siteName: title,
    url: new URL(env.APP_URL).href,
    images: [
      {
        url: ogImage.src,
        alt: title,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  const chosenTheme = cookies().get('theme')?.value
  const prefersColorScheme = headers().get('Sec-CH-Prefers-Color-Scheme')

  return (
    <CookiesProvider>
      <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://api.iconify.design" />
          <meta property="og:logo" content="/favicon.svg" />
        </head>
        <body className={cn(chosenTheme || prefersColorScheme, 'bg-gradient')}>{children}</body>
      </html>
    </CookiesProvider>
  )
}
