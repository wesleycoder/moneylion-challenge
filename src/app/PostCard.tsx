import { formatDistance } from 'date-fns'
import Image from 'next/image'
import type { HTMLProps } from 'react'
import { Likes } from '~/components/Likes'
import { ReadMore } from '~/components/ReadMore'
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from '~/components/Timeline'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '~/components/ui/sheet'
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
        <Dialog aria-label={post.textData.title}>
          <DialogTrigger asChild>
            <button type="button" className="relative w-full h-full" aria-label="Open image view">
              <Image
                src={post.imageUri}
                alt={post.textData.title}
                fill
                sizes="(min-width: 768px) 100vw, 95vw"
                placeholder="blur"
                blurDataURL={post.imageUriBlur}
                className={cn([
                  'object-cover w-full h-auto sm:rounded-t-md',
                  'animate-blur-in no-scroll-timeline:animate-none',
                  '[animation-range:0%_100%] [animation-timeline:view()]',
                ])}
                priority={priority}
              />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[95dvw] w-max">
            <Image
              src={post.imageUri}
              alt={post.textData.title}
              height={600}
              width={1400}
              sizes="(min-width: 768px) 90vw, 95vw"
              placeholder="blur"
              blurDataURL={post.imageUriBlur}
              className="max-h-[90dvh] max-w-[95dvw] w-[100%]"
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <Dialog>
        <CardHeader>
          <CardTitle>{post.textData.title}</CardTitle>
          <CardDescription>
            <div className="text-foreground">{post.textData.subTitle}</div>
            <div>
              {post.textData.author.first} {post.textData.author.last} -{' '}
              <span className="text-sm text-muted-foreground">
                {formatDistance(post.metadata.publishDate, new Date(), { addSuffix: true })}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReadMore>{post.textData.body}</ReadMore>
        </CardContent>
        <Sheet>
          <SheetTrigger asChild>
            <CardFooter>
              <Button variant="ghost" size="sm">
                {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
              </Button>
            </CardFooter>
          </SheetTrigger>
          <SheetContent className="flex flex-col p-0 pb-12">
            <SheetHeader>
              <h3 className="p-4">Comments for: {post.textData.title}</h3>
            </SheetHeader>
            <Timeline>
              {post.comments.map((comment, i) => (
                <TimelineItem key={comment.text}>
                  <TimelineHeading>{comment.author}</TimelineHeading>
                  <TimelineDot className="size-8">
                    <Image
                      src={`${comment.profilePic}?id=${comment.author}`}
                      alt={comment.author}
                      fill
                      sizes="(min-width: 768px) 128px, 48px"
                      placeholder="blur"
                      blurDataURL={comment.profilePicBlur}
                    />
                  </TimelineDot>
                  {i + 1 < post.comments.length && <TimelineLine />}
                  <TimelineContent>
                    {comment.text}
                    <Likes likes={comment.likes} />
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </SheetContent>
        </Sheet>
      </Dialog>
    </Card>
  )
}
