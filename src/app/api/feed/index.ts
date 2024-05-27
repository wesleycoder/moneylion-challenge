import { z } from 'zod'
import { env } from '~/env'
import { ContentCardSchema } from '~/models/contentCard'
import loader from '~/server/imageLoader'

const feedOptions: RequestInit = {
  headers: {
    Accept: 'application/json',
    Prefer: `code=200, dynamic=${env.FEED_IS_DYNAMIC}`,
  },
}

const BLUR_SIZE = 128

export const getFeed = async () => {
  const response = await fetch(`${env.FEED_URL}/content`, feedOptions)
  const data = await response.json()
  const cards = z
    .object({ contentCards: z.array(ContentCardSchema) })
    .parse(data)
    .contentCards.sort((a, b) => b.metadata.priority - a.metadata.priority)

  const processedCards = await Promise.all(
    cards.map(async (card) => {
      const imageRes = await fetch(
        loader({ src: `${card.imageUri}?id=${card.id}`, width: BLUR_SIZE }),
      )
      const imabeBuffer = await imageRes.arrayBuffer()
      const imageUriBlur = `data:image/jpeg;base64,${Buffer.from(imabeBuffer).toString('base64')}`

      const comments = await Promise.all(
        card.comments.map(async (comment) => {
          const blurPicRes = await fetch(
            loader({ src: `${comment.profilePic}?id=${comment.author}`, width: BLUR_SIZE }),
          )
          const profileBuffer = await blurPicRes.arrayBuffer()
          const profilePicBlur = `data:image/jpeg;base64,${Buffer.from(profileBuffer).toString(
            'base64',
          )}`

          return {
            ...comment,
            profilePic: `${comment.profilePic}?id=${comment.author}`,
            profilePicBlur,
          }
        }),
      )
      return {
        ...card,
        imageUri: `${card.imageUri}?id=${card.id}`,
        imageUriBlur,
        comments,
      }
    }),
  )

  return processedCards
}
