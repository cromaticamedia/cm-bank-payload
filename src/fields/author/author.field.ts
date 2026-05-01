const authorField = [
  {
    name: 'authorType',
    type: 'radio' as const,
    label: 'Author type',
    defaultValue: 'registered',
    options: [
      { label: 'Registered user', value: 'registered' },
      { label: 'External author', value: 'external' },
    ],
    admin: {
      layout: 'horizontal' as const,
    },
  },
  {
    name: 'author',
    type: 'relationship' as const,
    relationTo: 'users' as const,
    label: 'Author (registered user)',
    admin: {
      condition: (data: any) => data?.authorType === 'registered',
    },
  },
  {
    name: 'authorName',
    type: 'text' as const,
    label: 'Author name (external)',
    admin: {
      condition: (data: any) => data?.authorType === 'external',
      description: 'Nombre del autor si no está registrado en Payload',
      placeholder: 'ej: John Doe, Cromatica Media',
    },
  },
]

export default authorField
