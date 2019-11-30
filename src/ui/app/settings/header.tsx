import * as React from 'react'

import { TextButton } from '../components/button'
import { Notify } from '../components/notify'
import { cls } from '../util'
import * as styles from './settings.css'

interface IHeaderProps {
  restoreDefaultsDisabled: boolean
  latestSaveTs: number
  onSaveClick(): void
  onCloseClick(): void
  onRestoreDefaults(): void
}

export const Header: React.FC<IHeaderProps> = ({
  onCloseClick,
  onSaveClick,
  onRestoreDefaults,
  restoreDefaultsDisabled,
  latestSaveTs
}) => (
  <div>
    <div {...cls(styles.buttons, styles.left)}>
      <TextButton
        disabled={restoreDefaultsDisabled}
        onClick={onRestoreDefaults}
      >
        restore defaults
      </TextButton>
    </div>
    <div {...cls(styles.buttons)}>
      <Notify
        latestTimestamp={latestSaveTs}
        className={styles.saved}
        animationClassName={styles.animation}
        duration={2500}
      >
        saved
      </Notify>
      {false ? <TextButton onClick={onSaveClick}>save</TextButton> : null}
      <TextButton {...cls(styles.close)} onClick={onCloseClick}>
        close
      </TextButton>
    </div>
  </div>
)
