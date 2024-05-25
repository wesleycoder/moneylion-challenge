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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui/dialog'
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
    <Card
      className={cn([
        'animate-zoom-in no-scroll-timeline:animate-none',
        '[animation-range:0%_100%] [animation-timeline:view()]',
        'rounded-none sm:rounded-md',
        className,
      ])}
      {...props}
    >
      <CardHeader className="relative p-0 h-96">
        <Dialog>
          <DialogTrigger asChild>
            <button type="button" className="relative w-full h-full">
              <Image
                src={post.imageUri}
                alt={post.textData.title}
                fill
                className={cn([
                  'object-cover w-full h-full sm:rounded-t-md',
                  'animate-blur-in no-scroll-timeline:animate-none',
                  '[animation-range:0%_100%] [animation-timeline:view()]',
                ])}
                priority={priority}
              />
            </button>
          </DialogTrigger>
          <DialogContent>
            <Image
              src={post.imageUri}
              alt={post.textData.title}
              height={600}
              width={1400}
              className="max-h-[90dvh]"
            />
          </DialogContent>
        </Dialog>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Image
                    src={post.imageUri}
                    alt={post.textData.title}
                    height={600}
                    width={1400}
                    className="object-cover w-full h-[40dvh] overflow-hidden"
                  />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription>
                      <Image
                        src={post.imageUri}
                        alt={post.textData.title}
                        height={600}
                        width={1400}
                      />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <div
                className={cn(
                  'absolute bottom-0 w-full px-6 py-2 bg-white/50 dark:bg-black/50',
                  'backdrop-blur-lg backdrop-brightness-100',
                  'backdrop-contrast-100 backdrop-saturate-100',
                )}
              >
                <SheetTitle>{post.textData.title}</SheetTitle>
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
