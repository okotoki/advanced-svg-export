import * as React from 'react'

import { cls } from '../util'
import * as styles from './layout.css'

interface ILayoutProps {
  header?: JSX.Element
  theme?: 'dark'
}

export const Layout: React.FC<ILayoutProps> = ({ children, header, theme }) => {
  return (
    <div {...cls(styles.layout, theme && styles.dark)}>
      <div {...cls(styles.wrapper)}>
        {header ? <div className={styles.header}>{header}</div> : null}
        <div {...cls(styles.content)}>{children}</div>
      </div>
    </div>
  )
}
