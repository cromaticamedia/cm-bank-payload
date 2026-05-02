import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'
import { isAdmin, isAuthenticated } from '@/hooks/useAuth'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAdmin,
  },
  folders: true,
  labels: {
    singular: {
      en: 'Media file',
      es: 'Archivo',
    },
    plural: {
      en: 'Media Files',
      es: 'Archivos',
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: false,
      admin: {
        description: {
          en: "Text to show in case there's an error rendering the image.",
          es: 'Texto a mostrar en caso haya un error mostrando la imagen.',
        },
        placeholder: {
          en: 'image-user-one',
          es: 'imagen-usuario-uno',
        },
      },
      label: { en: 'Fallack Text', es: 'Texto preventivo.' },
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    mimeTypes: ['image/*', 'video/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}

export default Media
