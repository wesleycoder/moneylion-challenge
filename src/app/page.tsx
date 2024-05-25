import { cookies } from 'next/headers'
import type { HTMLProps } from 'react'
import { cn } from '~/lib/utils'
import { PostCard } from './PostCard'
import { ToggleDarkMode } from './ToggleDarkMode'
import { getFeed } from './api/feed'

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
          'border-b border-border/40 bg-background/95 backdrop-blur-lg',
          'supports-[backdrop-filter]:bg-background/60',
          'dark:border-border/40 dark:supports-[backdrop-filter]:bg-background/80',
          'animate-header-shrink no-scroll-timeline:animate-none',
          '[animation-range:0px_74px] [animation-timeline:scroll()]',
        )}
      >
        <div className="flex items-center gap-2">
          <FeatherIcon className="w-6 h-6" title="feather icon" />
          <h1 className="text-xl font-semibold">Feed Challenge</h1>
        </div>
        <ToggleDarkMode setTheme={setTheme} />
      </header>
      <main
        aria-hidden="false"
        className="container flex flex-col justify-center min-h-screen gap-12 px-0 py-16 sm:px-4"
      >
        <h2 className="text-6xl font-extrabold tracking-tight text-center sm:text-7xl md:text-8xl lg:text-9xl text-primary">
          Enjoy your feed
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {feed.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              priority={i <= 4}
              className={cn([
                'animate-zoom-in no-scroll-timeline:animate-none',
                '[animation-range:0%_100%] [animation-timeline:view()]',
              ])}
            />
          ))}
        </div>
      </main>
    </>
  )
}
