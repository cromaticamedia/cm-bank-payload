'use client'

import type { Icon as PhosphorIconType } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import Typography from '@/components/atoms/Typography'
import Icon from '@/components/atoms/Icon'
import { getTypoSize } from './utils'
import { cn } from '@/utils/styles'
import * as React from 'react'

const iconVariants = cva(
  'cursor-pointer transition-colors duration-200 ease-in-out outline-none focus:outline-none',
  {
    variants: {
      iconSize: {
        sm: 'text-[28px] p-1',
        md: 'text-[32px] p-1',
        lg: 'text-[40px] p-1.5',
      },
      iconVariant: {
        none: 'bg-none',
        primary:
          'rounded-sm text-neutral-500 bg-primary-900 dark:bg-secondary-200 hover:bg-neutral-400 hover:text-white hover:dark:bg-primary-900 shadow-xs dark:text-white hover:dark:text-neutral-400',
        secondary: '',
        outlined: '',
        link: '',
      },
    },
    defaultVariants: {
      iconVariant: 'none',
      iconSize: 'md',
    },
  },
)

const buttonVariants = cva(
  'cursor-pointer flex flex-row items-center gap-2 shadow-sm transition-colors duration-300 ease-in-out outline-none focus:outline-none flex',
  {
    variants: {
      size: {
        sm: 'p-1 md:p-2 gap-2',
        md: 'p-2 md:p-4 gap-2',
        lg: 'p-3 md:p-5 gap-3',
      },
      variant: {
        icon: '',
        primary: [
          'relative overflow-hidden text-white',
          'bg-gradient-to-l from-primary-400 to-secondary-700',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-400',
          'before:opacity-0 before:transition-opacity before:duration-500 before:ease-in-out',
          'hover:before:opacity-400',
          '[&>*]:relative [&>*]:z-10',
        ].join(' '),
        secondary: '',
        outlined:
          'bg-white/10 backdrop-blur-md ring-2 ring-black dark:ring-white ring-inset hover:bg-neutral-100 hover:text-neutral-1000 hover:dark:ring-neutral-1000 shadow-none hover:dark:bg-neutral-1000 hover:dark:text-neutral-100',
        link: ' shadow-none hover:text-primary-500 hover:dark:text-secondary-700 w-auto relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current hover:after:w-full after:transition-all after:duration-300 p-0 md:p-0 gap-0 pb-1 lg:pb-1.5',
        clean: 'shadow-none hover:text-primary-200 w-fit p-0 gap-1',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type ButtonVariants = VariantProps<typeof buttonVariants>['variant']
type IconVariants = VariantProps<typeof iconVariants>['iconVariant']
type ButtonSizes = VariantProps<typeof buttonVariants>['size']
type IconSizes = VariantProps<typeof iconVariants>['iconSize']

interface ButtonProps {
  text?: string
  icon?: PhosphorIconType['name']
  iconWeight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  iconRightSide?: boolean
  iconSize?: IconSizes
  iconVariant?: IconVariants
  isIcon?: boolean
  onClick?: () => void
}

function Button({
  text,
  icon,
  iconWeight,
  iconRightSide = false,
  className,
  variant,
  size,
  iconSize,
  iconVariant,
  isIcon = false,
  onClick,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> &
  VariantProps<typeof iconVariants> &
  ButtonProps) {
  return (
    <button
      data-slot="button"
      data-variant={variant || iconVariant}
      data-size={size || iconSize}
      onClick={onClick}
      className={cn(
        isIcon
          ? iconVariants({ iconVariant, iconSize, className })
          : buttonVariants({ size, variant, className }),
        iconRightSide && 'pl-3 lg:pl-4',
      )}
      {...props}
    >
      {icon && !iconRightSide && (
        <Icon
          className={cn(isIcon ? '' : iconVariants({ iconVariant, iconSize }))}
          name={icon as PhosphorIconType['name']}
          weight={iconWeight}
        />
      )}
      {text && (
        <Typography
          variant={getTypoSize(size as string)}
          text={text}
          isRawHtml
          htmlTag="p"
          className="text-start"
        />
      )}
      {icon && iconRightSide && (
        <Icon
          className={cn(isIcon ? '' : iconVariants({ iconVariant, iconSize }))}
          name={icon as PhosphorIconType['name']}
          weight={iconWeight}
        />
      )}
    </button>
  )
}

export {
  Button,
  buttonVariants,
  type ButtonVariants,
  type IconVariants,
  type ButtonSizes,
  type IconSizes,
}
