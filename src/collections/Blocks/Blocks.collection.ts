import type { CollectionConfig } from 'payload'
import { isAuthenticated, isAdmin } from '@/hooks/useAuth'
import AuthorField from '@/fields/author'
import ChipsField from '@/fields/ChipsField/ChipsField.field'

const Blocks: CollectionConfig = {
  slug: 'blocks',
  admin: {
    useAsTitle: 'name',
    description: 'Block bank — reusable blocks for Cromatica templates',
    defaultColumns: ['name', 'category', 'status', 'updatedAt'],
    components: {
      edit: {
        beforeDocumentControls: [{ path: '@/components/payload/ViewInBankBtn#default' }],
      },
    },
  },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAdmin,
  },
  fields: [
    // --- Identidad del bloque ---
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Block slug — auto-converted to kebab-case. e.g: hero-split, perks-grid',
      },
      hooks: {
        beforeValidate: [
          ({ value }) =>
            value
              ?.toLowerCase()
              .trim()
              .replace(/([a-z])([A-Z])/g, '$1-$2')
              .replace(/[\s_]+/g, '-')
              .replace(/[^a-z0-9-]/g, '')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, ''),
        ],
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Nombre legible, ej: Travel Cards, Hero Split',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
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
    ChipsField({
      name: 'dependencies',
      label: { en: 'NPM Dependencies', es: 'Dependencias NPM' },
      description: {
        en: 'Dependencies the CLI must install when adding this block.',
        es: 'Dependencias que el CLI debe instalar al agregar este bloque.',
      },
      placeholder: 'e.g: framer-motion',
    }),
    ChipsField({
      name: 'tags',
      label: { en: 'Tags', es: 'Tags' },
      description: {
        en: 'Tags to help categorize and filter this block.',
        es: 'Tags para categorizar y filtrar este bloque.',
      },
      placeholder: 'e.g: animation, dark-mode',
    }),
  ],
}

export default Blocks
