import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'

export const queryTemplates = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'templates',
    limit: 100,
    pagination: false,
    where: {
      status: { equals: 'published' },
    },
    select: {
      name: true,
      slug: true,
      description: true,
      category: true,
      tier: true,
      status: true,
      thumbnail: true,
      tags: true,
      features: true,
      demoUrl: true,
    },
  })

  return result.docs
})

export const queryTemplateBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'templates',
    limit: 1,
    pagination: false,
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 2,
  })

  return result.docs[0] ?? null
})

export const queryTemplatesByCategory = cache(async (category: string) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'templates',
    limit: 100,
    pagination: false,
    where: {
      status: { equals: 'published' },
      category: { equals: category },
    },
    select: {
      name: true,
      slug: true,
      description: true,
      category: true,
      tier: true,
      thumbnail: true,
      tags: true,
      features: true,
      demoUrl: true,
    },
  })

  return result.docs
})

export const queryTemplatesByTier = cache(async (tier: 'free' | 'pro' | 'enterprise') => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'templates',
    limit: 100,
    pagination: false,
    where: {
      status: { equals: 'published' },
      tier: { equals: tier },
    },
    select: {
      name: true,
      slug: true,
      description: true,
      category: true,
      tier: true,
      thumbnail: true,
      tags: true,
      features: true,
      demoUrl: true,
    },
  })

  return result.docs
})
