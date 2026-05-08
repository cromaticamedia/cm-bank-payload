import type { Field } from 'payload'

type ChipsFieldProps = {
  name: string
  label?: Record<string, string>
  description?: Record<string, string>
  placeholder?: string
  localized?: boolean
  required?: boolean
}

const ChipsField = ({
  name,
  label = { en: 'Tags', es: 'Tags' },
  description,
  placeholder = 'Type and press Enter',
  localized = false,
  required = false,
}: ChipsFieldProps): Field => ({
  name,
  type: 'text',
  hasMany: true,
  label,
  required,
  localized,
  admin: {
    description,
    placeholder,
    components: {
      Field: '/fields/ChipsField/ChipsField.server#default',
    },
  },
})

export default ChipsField
