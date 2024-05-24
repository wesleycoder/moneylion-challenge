import { z } from 'zod'
import { env } from '~/env'

const PAGESPEED_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'

const resultSchema = z.object({
  lighthouseResult: z.object({
    categories: z.object({
      performance: z.object({
        score: z.number(),
      }),
    }),
  }),
})

const paramsSchema = z.object({
  type: z.enum(['performance', 'accessibility', 'best-practices', 'seo', 'pwa']),
})
type Params = z.infer<typeof paramsSchema>

export const GET = async (_req: Request, { params }: { params: Params }) => {
  const parsedParams = paramsSchema.safeParse(params)
  if (!parsedParams.success) {
    return new Response('Invalid type', { status: 400 })
  }
  const {
    data: { type },
  } = parsedParams

  const url = new URL(PAGESPEED_URL)
  url.searchParams.set('url', env.APP_URL)
  url.searchParams.set('category', 'PERFORMANCE')
  url.searchParams.set('strategy', 'DESKTOP')

  const response = await fetch(url, { next: { revalidate: env.BADGE_CACHE_TTL_MINUTES * 60 } })
  const data = await response.json()
  const result = resultSchema.parse(data)
  const score = Math.round(result.lighthouseResult.categories.performance.score * 100)
  return new Response(
    JSON.stringify({
      subject: score,
      status: `lightouse ${type}`,
      color: score >= 90 ? 'green' : score >= 70 ? 'orange' : score >= 50 ? 'yellow' : 'red',
      cache: env.BADGE_CACHE_TTL_MINUTES * 60,
      icon: 'lightouse',
    }),
  )
}
