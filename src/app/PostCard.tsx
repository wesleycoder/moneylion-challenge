import Image from 'next/image'
import type { HTMLProps } from 'react'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'
import { cn } from '~/lib/utils'
import type { ContentCard } from '~/models/contentCard'

type PostCardProps = HTMLProps<HTMLDivElement> & {
  post: ContentCard
  priority?: boolean
}

export const PostCard = ({ post, priority, className, ...props }: PostCardProps) => {
  return (
    <Card className={cn('rounded-none sm:rounded-md', className)} {...props}>
      <CardHeader className="relative h-96">
        <Image
          src={post.imageUri}
          alt={post.textData.title}
          fill
          className="object-cover w-full h-full sm:rounded-t-md"
          priority={priority}
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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="link">Read more</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="flex flex-col p-0 pb-12">
            <SheetHeader className="relative">
              <Image
                src={post.imageUri}
                alt={post.textData.title}
                height={400}
                width={600}
                className="object-cover w-full h-[40dvh] overflow-hidden"
                priority={priority}
              />
              <div className="absolute bottom-0 w-full px-6 py-2 backdrop-blur backdrop-brightness-50 backdrop-contrast-125">
                <SheetTitle className="backdrop-blur-xl">{post.textData.title}</SheetTitle>
                <SheetDescription>{post.textData.subTitle}</SheetDescription>
              </div>
            </SheetHeader>
            <div className="overflow-y-auto max-h-[45dvh]">
              <p className="px-6 break-words">{post.textData.body}</p>
            </div>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  )
}
