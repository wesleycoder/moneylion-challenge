import { GeistSans } from 'geist/font/sans'
import { CookiesProvider } from 'next-client-cookies/server'
import { cookies, headers } from 'next/headers'
import type { PropsWithChildren } from 'react'
import { cn } from '~/lib/utils'
import './theme.css'

export const metadata = {
  title: 'MoneyLion Challenge',
  description: 'Feed sample for Moneylion Challenge',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: PropsWithChildren) {
  const chosenTheme = cookies().get('theme')?.value
  const prefersColorScheme = headers().get('Sec-CH-Prefers-Color-Scheme')

  return (
    <CookiesProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <head>
          <link rel="preconnect" href="https://api.iconify.design" />
        </head>
        <body className={cn(chosenTheme || prefersColorScheme, 'bg-gradient')}>{children}</body>
      </html>
    </CookiesProvider>
  )
}
