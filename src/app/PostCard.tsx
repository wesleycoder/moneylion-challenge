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
import type { ContentCard } from '~/models/contentCard'

type PostCardProps = {
  post: ContentCard
  priority?: boolean
}

export const PostCard = ({ post, priority }: PostCardProps) => {
  return (
    <Card key={post.id} className="overflow-hidden">
      <CardHeader className="relative h-96">
        <Image
          src={post.imageUri}
          alt={post.textData.title}
          fill
          className="object-cover w-full h-full"
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
        <Button variant="link">Read more</Button>
      </CardFooter>
    </Card>
  )
}
