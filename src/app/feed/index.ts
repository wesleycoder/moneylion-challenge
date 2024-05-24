import '@total-typescript/ts-reset'
import { z } from 'zod'
import { env } from '~/env'
import { ContentCardSchema } from '~/models/contentCard'

const feedOptions: RequestInit = {
  headers: {
    Accept: 'application/json',
    Prefer: `code=200, dynamic=${env.FEED_IS_DYNAMIC}`,
  },
}

/**
 * Random offset to get different images for each card when the feed is static
 * this way the images will be the same between requests and different for each card
 * this is just for presentation purposes and should not be used in a real production scenario
 */
const picsumOffset = Math.floor(Math.random() * 50)

export const getFeed = async () => {
  const response = await fetch(`${env.FEED_URL}/content`, feedOptions)
  const data = await response.json()
  return z
    .object({ contentCards: z.array(ContentCardSchema) })
    .parse(data)
    .contentCards.map(
      !env.FEED_IS_DYNAMIC
        ? (card, i) => {
            return {
              ...card,
              imageUri: `${card.imageUri.replace(
                'picsum.photos',
                `picsum.photos/id/${i + picsumOffset}`,
              )}`,
            }
          }
        : (i) => i,
    )
    .sort((a, b) => b.metadata.priority - a.metadata.priority)
}
