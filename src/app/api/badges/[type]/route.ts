import { z } from 'zod'
import { env } from '~/env'

export const maxDuration = 60

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
  url.searchParams.set('category', type.toUpperCase())
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
      icon: encodeURIComponent(
        'data:image/svg+xml,<svg fill="%23F44B21" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Lighthouse</title><path d="M12 0l5.5 3.5v5H20v3h-2.25l2 12.5H4.25l2-12.5H4v-3h2.5V3.53zm2.94 13.25l-6.22 2.26L8 20.04l7.5-2.75zM12 3.56L9.5 5.17V8.5h5V5.15Z"/></svg>',
      ),
    }),
  )
}
