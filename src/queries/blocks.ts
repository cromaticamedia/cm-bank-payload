import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'

export const queryBlocks = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blocks',
    limit: 100,
    pagination: false,
    where: {
      status: { equals: 'stable' },
    },
    select: {
      name: true,
      label: true,
      description: true,
      category: true,
      status: true,
      preview: true,
      tags: true,
      dependencies: true,
      authorName: true,
    },
  })

  return result.docs
})

export const queryBlockByName = cache(async (name: string) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blocks',
    limit: 1,
    pagination: false,
    where: {
      name: { equals: name },
      status: { equals: 'stable' },
    },
    depth: 2,
  })

  return result.docs[0] ?? null
})

export const queryBlocksByCategory = cache(async (category: string) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blocks',
    limit: 100,
    pagination: false,
    where: {
      status: { equals: 'stable' },
      category: { equals: category },
    },
    select: {
      name: true,
      label: true,
      description: true,
      category: true,
      status: true,
      preview: true,
      tags: true,
      dependencies: true,
      authorName: true,
    },
  })

  return result.docs
})

export const queryBlocksPaginated = cache(async (page: number = 1) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blocks',
    limit: 9,
    page,
    pagination: true,
    where: {
      status: { equals: 'stable' },
    },
    select: {
      name: true,
      label: true,
      description: true,
      category: true,
      status: true,
      preview: true,
      tags: true,
      dependencies: true,
      authorName: true,
    },
  })

  return {
    docs: result.docs,
    totalPages: result.totalPages,
    totalDocs: result.totalDocs,
    page: result.page ?? 1,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
  }
})
