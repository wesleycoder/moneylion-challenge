'use client'
import { Icon } from '@iconify-icon/react'
import { useState } from 'react'
import { Button } from './ui/button'

export const Likes = ({ likes: initialLikes }: { likes: number }) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(initialLikes)
  return (
    <Button
      className="flex gap-2 text-sm rounded-none text-secondary"
      variant="ghost"
      size="sm"
      onClick={() => {
        setLikes((l) => (liked ? l - 1 : l + 1))
        setLiked((l) => !l)
      }}
    >
      <Icon icon={liked ? 'clarity:thumbs-up-solid' : 'clarity:thumbs-up-line'} size={24} />
      {likes} likes
    </Button>
  )
}
