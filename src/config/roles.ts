export const ROLES = [
  {
    name: 'admin',
    labels: {
      en: 'Administrator',
      es: 'Administrador',
    },
  },
  {
    name: 'developer',
    labels: {
      en: 'Developer',
      es: 'Desarrollador',
    },
  },
] as const
export type Role = (typeof ROLES)[number]
