import Image from 'next/image'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { getFeed } from '~/server/getFeed'

export default async function HomePage() {
  const feed = await getFeed()
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl text-primary font-extrabold tracking-tight sm:text-[5rem]">Feed</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {feed.map((post, i) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="relative h-96">
                <Image
                  src={post.imageUri}
                  alt={post.textData.title}
                  fill
                  className="object-cover w-full h-full"
                  priority={i < 3}
                />
              </CardHeader>
              <CardHeader>
                <CardTitle>{post.textData.title}</CardTitle>
                <CardDescription>{post.textData.subTitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="break-words line-clamp-3 overflow-ellipsis">{post.textData.body}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link">Read more</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
