import { env } from '~/env'

const feedOptions: RequestInit = {
  headers: {
    Accept: 'application/json',
    Prefer: `code=200, dynamic=${env.FEED_IS_DYNAMIC}`,
  },
}

export const getFeed = async () => {
  const response = await fetch(`${env.FEED_URL}/content`, feedOptions)
  return await response.json()
}
