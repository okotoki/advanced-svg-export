import * as React from 'react'

import { _f, cls } from '../util'
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
  onClick?(): void
}

export const LinkButton: React.FC<ILinkButtonProps> = ({
  children,
  disabled,
  size,
  href,
  download,
  onClick
}) => {
  disabled = disabled || false
  const sizeClassName = styles[size || 'medium']
  onClick = onClick || _f

  const c = cls(styles.button, disabled && styles.disabled, sizeClassName)
  return (
    <a href={href} download={download || undefined} onClick={onClick} {...c}>
      {children}
    </a>
  )
}

interface ITextButtonProps {
  disabled?: boolean
  className?: string
  onClick(): void
}

export const TextButton: React.FC<ITextButtonProps> = ({
  onClick,
  children,
  disabled,
  className
}) => (
  <div
    {...cls(className, styles.textButton, disabled && styles.disabled)}
    onClick={onClick}
  >
    {children}
  </div>
)
