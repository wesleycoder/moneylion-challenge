import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const CURRENT_DOMAIN =
  process.env.APP_DOMAIN ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  process.env.VERCEL_BRANCH_URL ||
  'localhost:3000'

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    FEED_URL: z.string().url(),
    FEED_IS_DYNAMIC: z.preprocess((val) => val === 'true', z.boolean()).default(false),
    GOOGLE_API_KEY: z.string().optional(),
    APP_URL: z.string().url(),
    APP_URLS: z.preprocess(
      (s) => (typeof s === 'string' ? s.split(',').filter(Boolean) : []),
      z.array(z.string().url()).default([]),
    ),
    BADGE_CACHE_TTL_MINUTES: z.coerce.number().default(15),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    FEED_URL: process.env.FEED_URL,
    FEED_IS_DYNAMIC: process.env.FEED_IS_DYNAMIC,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    APP_URL: `https://${CURRENT_DOMAIN}`,
    APP_URLS: [process.env.APP_URLS, `https://${CURRENT_DOMAIN}`].join(','),
    BADGE_CACHE_TTL_MINUTES: process.env.BADGE_CACHE_TTL_MINUTES,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
