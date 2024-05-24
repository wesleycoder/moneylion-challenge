import { getFeed } from '.'

export const GET = async () => {
  return new Response(JSON.stringify(await getFeed()))
}
