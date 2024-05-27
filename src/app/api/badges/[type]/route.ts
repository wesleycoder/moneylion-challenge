import { z } from 'zod'
import { env } from '~/env'

export const maxDuration = 60

const PAGESPEED_URL = 'https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed'

const resultSchema = z.object({
  lighthouseResult: z.object({
    categories: z.object({
      performance: z.object({
        score: z.number(),
      }),
      accessibility: z.object({
        score: z.number(),
      }),
      'best-practices': z.object({
        score: z.number(),
      }),
      seo: z.object({
        score: z.number(),
      }),
    }),
  }),
})

const paramsSchema = z.object({
  type: z.enum(['performance', 'accessibility', 'best-practices', 'seo']),
  strategy: z.enum(['desktop', 'mobile']),
})
type Params = z.infer<typeof paramsSchema>

export const GET = async (req: Request, { params }: { params: Params }) => {
  const searchParams = new URLSearchParams(req.url.split('?')[1])
  const parsedParams = paramsSchema.safeParse({
    ...params,
    strategy: searchParams.get('strategy') || 'desktop',
  })
  if (!parsedParams.success) {
    return new Response('Invalid type', { status: 400 })
  }
  const {
    data: { type, strategy },
  } = parsedParams

  const url = new URL(PAGESPEED_URL)
  if (env.GOOGLE_API_KEY) {
    url.searchParams.set('key=', env.GOOGLE_API_KEY)
  }
  url.searchParams.set('url', env.APP_URL)
  url.searchParams.set('strategy', strategy.toUpperCase())
  url.searchParams.append('category', 'PERFORMANCE')
  url.searchParams.append('category', 'ACCESSIBILITY')
  url.searchParams.append('category', 'BEST_PRACTICES')
  url.searchParams.append('category', 'SEO')

  const response = await fetch(url, { next: { revalidate: env.BADGE_CACHE_TTL_MINUTES * 60 } })
  const res = await response.json()
  const { success, data, error } = resultSchema.safeParse(res)

  if (!success) {
    return new Response(
      JSON.stringify({ message: 'Invalid response from Google Pagespeed API', error }, null, 2),
      { status: 500 },
    )
  }
  const score = Math.round(data.lighthouseResult.categories[type].score * 100)
  return new Response(
    JSON.stringify({
      subject: score,
      status: `lightouse ${type}`,
      color: score >= 90 ? 'green' : score >= 70 ? 'orange' : score >= 50 ? 'yellow' : 'red',
      cache: env.BADGE_CACHE_TTL_MINUTES * 60,
      icon: encodeURIComponent(
        `data:image/svg+xml,<svg
          fill="%23F44B21" role="img" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Lighthouse</title>
          <path d="M12 0l5.5 3.5v5H20v3h-2.25l2 12.5H4.25l2-12.5H4v-3h2.5V3.53zm2.94 13.25l-6.22
          2.26L8 20.04l7.5-2.75zM12 3.56L9.5 5.17V8.5h5V5.15Z"/>
        </svg>`,
      ),
    }),
  )
}
