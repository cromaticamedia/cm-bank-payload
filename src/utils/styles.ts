import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-size-1',
        'text-size-2',
        'text-size-3',
        'text-size-4',
        'text-size-5',
        'text-size-6',
        'text-size-7',
        'text-size-8',
      ],
    },
  },
})

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
