import { cookies } from 'next/headers'
import { getFeed } from '~/server/getFeed'
import { PostCard } from './PostCard'
import { ToggleDarkMode } from './ToggleDarkMode'

export const setTheme = async (theme?: string) => {
  'use server'
  if (theme && theme !== 'system') {
    cookies().set('theme', theme)
  } else {
    cookies().delete('theme')
  }
}

export default async function HomePage() {
  const feed = await getFeed()
  return (
    <>
      <ToggleDarkMode className="absolute right-2 top-2" setTheme={setTheme} />
      <main className="container flex flex-col items-center justify-center gap-12 px-4 py-16 min-h-screen">
        <h1 className="text-5xl text-primary font-extrabold tracking-tight sm:text-[5rem]">
          Enjoy your feed
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {feed.map((post, i) => (
            <PostCard key={post.id} post={post} priority={i <= 4} />
          ))}
        </div>
      </main>
    </>
  )
}
