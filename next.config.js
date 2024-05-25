import { env } from './src/env.js'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js')

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    serverActions: {
      allowedOrigins: ['http://localhost:3000', ...env.APP_URLS],
    },
  },
  images: {
    domains: ['picsum.photos'],
    /**
     * Opting out of optimization to avoid images from picsum changing when resizing the window
     * caused by the optimization using a srcset with different urls.
     * In a real production scenario we should remove this option and let Next.js optimize
     * the images or use a custom loader or third-party service
     */
    unoptimized: env.NODE_ENV === 'development',
  },
}

export default config
