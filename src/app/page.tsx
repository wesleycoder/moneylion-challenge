import Link from 'next/link'
import { getFeed } from '~/server/getFeed'

export default async function HomePage() {
  const feed = await getFeed()
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <pre className="flex flex-col max-w-xs gap-4 p-4 overflow-x-auto max-h-96 rounded-xl bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20">
            {JSON.stringify(feed, null, 2)}
          </pre>
          <Link
            className="flex flex-col max-w-xs gap-4 p-4 rounded-xl bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your database and
              authentication.
            </div>
          </Link>
          <Link
            className="flex flex-col max-w-xs p-4 rounded-xl bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to deploy it.
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
