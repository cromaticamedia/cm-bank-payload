import type { CollectionConfig } from 'payload'
import { ROLES, type Role } from '@/config/roles'
import { isAdmin, isAuthenticated } from '@/hooks/useAuth'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: isAuthenticated,
    create: isAdmin,
    read: isAuthenticated,
    update: isAdmin,
    delete: isAdmin,
  },
  labels: {
    singular: {
      en: 'User',
      es: 'Usuario',
    },
    plural: {
      en: 'Users',
      es: 'Usuarios',
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['id', 'firstName', 'lastName', 'role', 'email', 'avatar'],
  },
  auth: true,
  fields: [
    // Email added by default
    {
      name: 'avatar',
      type: 'upload',
      required: false,
      localized: false,
      relationTo: 'media',
      label: {
        en: 'Avatar',
        es: 'Foto de perfil',
      },
      admin: {
        condition: (data, siblingData, { user }) => {
          // Show field if user is autenticated, this works for first-time loggers.
          return Boolean(user)
        },
      },
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
      localized: false,
      label: {
        en: 'First Name',
        es: 'Nombres',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      localized: false,
      label: {
        en: 'Last Name',
        es: 'Apellidos',
      },
    },
    {
      name: 'role',
      type: 'select',
      label: {
        en: 'Role',
        es: 'Permiso',
      },
      required: true,
      localized: false,
      defaultValue: 'developer',
      options: ROLES.map((role: Role) => ({
        label: role.labels,
        value: role.name,
      })),
    },
  ],
}

export default Users
