import type { ImageLoader } from 'next/image'

const picsumRegex = /(?<base>.*picsum.photos)\/(?<w>\d+)(?:\/(?<h>\d+))?.*(?:id=(?<id>.+))/i

const getH = (w: number, h: number, newW: number) => Math.min(Math.round(newW / (w / h || w)), 4096)
const getPathForSize = (w: number, h: number, newW: number) => `${newW}/${getH(w, h, newW)}`

const loader: ImageLoader = ({ src, width = 1024, quality = 100 }) => {
  if (picsumRegex.test(src)) {
    const resized = src.replace(
      picsumRegex,
      (_, base, w, h, id) => `${base}/seed/${id}/${getPathForSize(w, h, width)}.webp`,
    )
    return resized
  }
  return `${src}?w=${width}&q=${quality}`
}

export default loader
