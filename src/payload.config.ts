import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import Blocks from '@/collections/Blocks'
import Users from '@/collections/Users'
import Medias from '@/collections/Medias'
import Templates from '@/collections/Templates'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '@/components/dashboard/CompanyLogo#default',
        Icon: '@/components/dashboard/CompanyIcon#default',
      },
    },
  },
  collections: [Users, Medias, Blocks, Templates],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.SUPABASE_STORAGE_BUCKET || 'Media',
      config: {
        endpoint: process.env.SUPABASE_STORAGE_ENDPOINT || '',
        credentials: {
          accessKeyId: process.env.SUPABASE_STORAGE_ACCESS_KEY || '',
          secretAccessKey: process.env.SUPABASE_STORAGE_SECRET_KEY || '',
        },
        region: 'sa-east-1',
        forcePathStyle: true,
      },
      acl: 'public-read',
    }),
  ],
})
