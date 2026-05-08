import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'

export const getAnalytics = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const [blocks, templates] = await Promise.all([
    payload.find({
      collection: 'blocks',
      limit: 0,
      pagination: false,
    }),
    payload.find({
      collection: 'templates',
      limit: 0,
      pagination: false,
    }),
  ])

  // Blocks por status
  const blocksByStatus = {
    stable: blocks.docs.filter((b) => b.status === 'stable').length,
    draft: blocks.docs.filter((b) => b.status === 'draft').length,
    deprecated: blocks.docs.filter((b) => b.status === 'deprecated').length,
  }

  // Blocks por categoría
  const blocksByCategory = blocks.docs.reduce<Record<string, number>>((acc, b) => {
    const cat = b.category ?? 'other'
    acc[cat] = (acc[cat] ?? 0) + 1
    return acc
  }, {})

  // Templates por status
  const templatesByStatus = {
    published: templates.docs.filter((t) => t.status === 'published').length,
    draft: templates.docs.filter((t) => t.status === 'draft').length,
    deprecated: templates.docs.filter((t) => t.status === 'deprecated').length,
  }

  // Templates por tier
  const templatesByTier = {
    free: templates.docs.filter((t) => t.tier === 'free').length,
    pro: templates.docs.filter((t) => t.tier === 'pro').length,
    enterprise: templates.docs.filter((t) => t.tier === 'enterprise').length,
  }

  return {
    blocks: {
      total: blocks.totalDocs,
      byStatus: blocksByStatus,
      byCategory: blocksByCategory,
    },
    templates: {
      total: templates.totalDocs,
      byStatus: templatesByStatus,
      byTier: templatesByTier,
    },
  }
})
