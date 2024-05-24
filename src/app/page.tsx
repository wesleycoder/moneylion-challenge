import { cookies } from 'next/headers'
import { PostCard } from './PostCard'
import { ToggleDarkMode } from './ToggleDarkMode'
import { getFeed } from './feed'

const setTheme = async (theme?: string) => {
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
    <main className="container flex flex-col justify-center min-h-screen gap-12 px-0 py-16 sm:px-4">
      <ToggleDarkMode className="absolute right-2 top-2" setTheme={setTheme} />
      <h1 className="text-6xl font-extrabold tracking-tight text-center sm:text-7xl md:text-8xl lg:text-9xl text-primary">
        Enjoy your feed
      </h1>
      <div className="grid grid-cols-1 gap-4">
        <h2 className="justify-start font-extrabold tracking-tight text-left text-secondary">
          Here are some recommendations:
        </h2>
        {feed.map((post, i) => (
          <PostCard key={post.id} post={post} priority={i <= 4} />
        ))}
      </div>
    </main>
  )
}
