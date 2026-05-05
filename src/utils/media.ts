import type { Media } from '@/payload-types'

export function getImageProps(media: Media, sizes: string = '100vw') {
  const srcSet = [
    media.sizes?.small?.url && `${media.sizes.small.url} 600w`,
    media.sizes?.medium?.url && `${media.sizes.medium.url} 900w`,
    media.sizes?.large?.url && `${media.sizes.large.url} 1400w`,
    media.sizes?.xlarge?.url && `${media.sizes.xlarge.url} 1920w`,
  ]
    .filter(Boolean)
    .join(', ')

  return {
    src: media.url ?? '',
    srcSet: srcSet || undefined,
    sizes,
    alt: media.alt ?? '',
    width: media.width ?? 0,
    height: media.height ?? 0,
  }
}
