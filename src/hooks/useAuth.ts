import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'

type BooleanAccess = (args: AccessArgs) => boolean

export const isAuthenticated: BooleanAccess = ({ req: { user } }) => {
  return Boolean(user)
}

export const isAdmin: BooleanAccess = ({ req: { user } }) => {
  return (user as User)?.role === 'admin'
}

export const isDeveloper: BooleanAccess = ({ req: { user } }) => {
  return (user as User)?.role === 'developer'
}
