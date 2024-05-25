import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import type { HTMLProps } from 'react'
import { cn } from '~/lib/utils'
import { PostCard } from './PostCard'
import { getFeed } from './api/feed'

const ToggleDarkMode = dynamic(() => import('./ToggleDarkMode'))

const setTheme = async (theme?: string) => {
  'use server'
  if (theme && theme !== 'system') {
    cookies().set('theme', theme)
  } else {
    cookies().delete('theme')
  }
}

function FeatherIcon(props: HTMLProps<SVGSVGElement> & { title: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>{props.title}</title>
      <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
      <path d="M16 8 2 22" />
      <path d="M17.5 15H9" />
    </svg>
  )
}

export default async function HomePage() {
  const feed = await getFeed()
  return (
    <>
      <header
        aria-hidden="false"
        className={cn(
          'sticky top-0 flex items-center justify-between z-10 px-6 py-4',
          'border-b border-border/40 bg-background/95 backdrop-blur-2xl',
          'supports-[backdrop-filter]:bg-background/50',
          'dark:border-border/40 dark:supports-[backdrop-filter]:bg-background/80',
          'animate-header-shrink no-scroll-timeline:animate-none',
          '[animation-range:0rem_4rem] [animation-timeline:scroll()]',
        )}
      >
        <div className="container flex justify-between p-0">
          <div className="flex items-center gap-2 px-4">
            <FeatherIcon className="w-6 h-6" title="feather icon" />
            <h1 className="text-xl font-semibold">Feed Challenge</h1>
          </div>
          <ToggleDarkMode setTheme={setTheme} />
        </div>
      </header>
      <main
        aria-hidden="false"
        className={cn('container grid grid-cols-1 justify-center gap-6 pb-[30dvh] px-0 sm:px-4')}
      >
        <h2 className="text-5xl font-extrabold tracking-tight py-8 text-center sm:text-7xl md:text-8xl lg:text-9xl text-primary [scroll-snap-align:start]">
          Enjoy your feed
        </h2>
        {feed.map((post, i) => (
          <PostCard key={post.id} post={post} priority={i <= 4} />
        ))}
      </main>
    </>
  )
}
