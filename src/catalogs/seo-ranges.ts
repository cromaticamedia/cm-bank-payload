export const SEO_RANGES = {
  metaTitle: {
    bad: 20,
    min: 30,
    max: 45,
  },
  metaDescription: {
    bad: 80,
    min: 100,
    max: 150,
  },
} as const

export type SeoRangeKey = keyof typeof SEO_RANGES
