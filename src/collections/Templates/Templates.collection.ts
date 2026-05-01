import type { CollectionConfig } from 'payload'
import AuthorField from '@/fields/author'

const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    useAsTitle: 'name',
    description: 'Figma templates available for Cromatica clients',
    defaultColumns: ['name', 'author', 'tier', 'status', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // --- Identidad ---
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly name, ej: travel-agency-pro',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    ...AuthorField,

    // --- Clasificación ---
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Brochure Website', value: 'brochure' },
        { label: 'E-commerce', value: 'ecommerce' },
        { label: 'Portfolio', value: 'portfolio' },
        { label: 'SaaS', value: 'saas' },
        { label: 'Blog', value: 'blog' },
        { label: 'Landing Page', value: 'landing' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      options: [
        { label: 'Free', value: 'free' },
        { label: 'Pro', value: 'pro' },
        { label: 'Enterprise', value: 'enterprise' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Deprecated', value: 'deprecated' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },

    // --- Features ---
    {
      name: 'features',
      type: 'group',
      label: 'Features',
      fields: [
        {
          name: 'darkMode',
          type: 'checkbox',
          label: 'Dark mode included',
          defaultValue: false,
        },
        {
          name: 'responsive',
          type: 'checkbox',
          label: 'Responsive',
          defaultValue: true,
        },
        {
          name: 'animations',
          type: 'checkbox',
          label: 'Animations',
          defaultValue: false,
        },
        {
          name: 'i18n',
          type: 'checkbox',
          label: 'Multi-language (i18n)',
          defaultValue: false,
        },
        {
          name: 'cms',
          type: 'checkbox',
          label: 'CMS integrated',
          defaultValue: true,
        },
        {
          name: 'pagesCount',
          type: 'number',
          label: 'Number of pages',
        },
        {
          name: 'blocksCount',
          type: 'number',
          label: 'Number of blocks',
        },
      ],
    },

    // --- Figma ---
    {
      name: 'figma',
      type: 'group',
      label: 'Figma',
      fields: [
        {
          name: 'embedUrl',
          type: 'text',
          label: 'Figma embed URL',
          required: true,
          admin: {
            description:
              'URL del iframe embed de Figma. Formato: https://www.figma.com/embed?embed_host=share&url=...',
          },
        },
        {
          name: 'fileUrl',
          type: 'text',
          label: 'Figma file URL',
          admin: {
            description: 'Link directo al archivo de Figma para abrir en el app',
          },
        },
        {
          name: 'previewUrl',
          type: 'text',
          label: 'Figma prototype URL',
          admin: {
            description: 'Link al prototipo interactivo si existe',
          },
        },
      ],
    },

    // --- Media ---
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Thumbnail',
      admin: {
        description: 'Imagen principal del template, se muestra en el listado',
      },
    },
    {
      name: 'screenshots',
      type: 'array',
      label: 'Screenshots',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },

    // --- Demo ---
    {
      name: 'demoUrl',
      type: 'text',
      label: 'Live demo URL',
      admin: {
        description: 'URL del deploy de demo del template',
      },
    },
  ],
}

export default Templates
