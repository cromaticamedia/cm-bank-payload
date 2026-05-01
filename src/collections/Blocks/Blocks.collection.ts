// src/collections/Blocks.ts
import type { CollectionConfig } from 'payload'
import AuthorField from '@/fields/author'

const Blocks: CollectionConfig = {
  slug: 'blocks',
  admin: {
    useAsTitle: 'name',
    description: 'Block bank — reusable blocks for Cromatica templates',
    defaultColumns: ['name', 'category', 'status', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // --- Identidad del bloque ---
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Slug del bloque, ej: travel-cards, hero-split, perks-grid',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Nombre legible, ej: Travel Cards, Hero Split',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Qué hace este bloque y cuándo usarlo',
      },
    },
    ...AuthorField,
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Hero', value: 'hero' },
        { label: 'Cards', value: 'cards' },
        { label: 'Perks / Features', value: 'perks' },
        { label: 'CTA', value: 'cta' },
        { label: 'Testimonials', value: 'testimonials' },
        { label: 'Gallery', value: 'gallery' },
        { label: 'Form', value: 'form' },
        { label: 'Navigation', value: 'navigation' },
        { label: 'Footer', value: 'footer' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Stable', value: 'stable' },
        { label: 'Deprecated', value: 'deprecated' },
      ],
    },

    // --- Código del bloque ---
    {
      name: 'files',
      type: 'group',
      label: 'Block files',
      fields: [
        {
          name: 'blockTs',
          type: 'code',
          label: 'block.ts (Payload schema)',
          required: true,
          admin: {
            language: 'typescript',
            description: 'Contenido del archivo .block.ts',
          },
        },
        {
          name: 'componentTsx',
          type: 'code',
          label: 'Component.tsx',
          required: true,
          admin: {
            language: 'typescript',
            description: 'Contenido del componente React',
          },
        },
        {
          name: 'mockData',
          type: 'code',
          label: 'Mock data (JSON)',
          admin: {
            language: 'json',
            description: 'Datos de ejemplo para el preview del dashboard',
          },
        },
      ],
    },

    // --- Preview ---
    {
      name: 'preview',
      type: 'upload',
      relationTo: 'media',
      label: 'Preview screenshot',
      admin: {
        description: 'Screenshot del bloque renderizado',
      },
    },

    // --- Metadata para el CLI ---
    {
      name: 'dependencies',
      type: 'array',
      label: 'NPM dependencies',
      admin: {
        description: 'Dependencias que el CLI debe instalar al agregar este bloque',
      },
      fields: [
        {
          name: 'package',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'ej: framer-motion, lucide-react',
          },
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
}

export default Blocks
