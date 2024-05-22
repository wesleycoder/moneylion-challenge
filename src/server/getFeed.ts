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

export const getFeed = async () => {
  const response = await fetch(`${env.FEED_URL}/content`, feedOptions)
  const data = await response.json()
  return z.object({ contentCards: z.array(ContentCardSchema) }).parse(data).contentCards
}
