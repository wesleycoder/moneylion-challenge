import type { ImageLoader } from 'next/image'

const picsumRegex = /(?<base>.*picsum.photos)\/(?<w>\d+)(?:\/(?<h>\d+))?/i

const getH = (w: number, h: number, newW: number) => Math.min(Math.round(newW / (w / h)), 4096)
export const getUrlForSize = (base: string, w: number, h: number, newW: number) =>
  `${base}/${newW}/${getH(w, h, newW)}.webp`

const loader: ImageLoader = ({ src, width = 1024, quality = 100 }) => {
  const params = new URLSearchParams(src.split('?')[1])
  const id = params.get('id') || Math.round(Math.random() * 1000).toString()

  if (picsumRegex.test(src)) {
    const resized = src.replace(picsumRegex, (_, base, w, h) => {
      const origW = Number.parseInt(w, 10)
      const origH = h ? Number.parseInt(h, 10) : w
      return getUrlForSize(
        `${base}/seed/${id}`,
        params.has('blur') ? Math.round(origW / 128) : origW,
        params.has('blur') ? Math.round(origH / 128) : origH,
        width,
      )
    })
    return resized
  }
  return `${src}?w=${width}&q=${quality}`
}

export default loader
