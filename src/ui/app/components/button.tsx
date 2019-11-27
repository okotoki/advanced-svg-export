import * as React from 'react'

import { cls } from '../util'
import * as styles from './button.css'

interface IBaseButtonProps {
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
}

interface IButtonProps extends IBaseButtonProps {
  onClick(): void
}

export const Button: React.FC<IButtonProps> = ({
  children,
  disabled,
  size,
  onClick
}) => {
  disabled = disabled || false
  const sizeClassName = styles[size || 'medium']
  const c = cls(styles.button, disabled && styles.disabled, sizeClassName)
  return (
    <button onClick={onClick} {...c}>
      {children}
    </button>
  )
}

interface ILinkButtonProps extends IBaseButtonProps {
  href: string
  download?: string
}

export const LinkButton: React.FC<ILinkButtonProps> = ({
  children,
  disabled,
  size,
  href,
  download
}) => {
  disabled = disabled || false
  const sizeClassName = styles[size || 'medium']

  const c = cls(styles.button, disabled && styles.disabled, sizeClassName)
  return (
    <a href={href} download={download || undefined} {...c}>
      {children}
    </a>
  )
}

interface ITextButtonProps {
  className?: string
  onClick(): void
}

export const TextButton: React.FC<ITextButtonProps> = ({
  onClick,
  children,
  className
}) => (
  <div {...cls(className, styles.textButton)} onClick={onClick}>
    {children}
  </div>
)
