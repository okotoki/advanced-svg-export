import * as React from 'react'
import { PluginsSettings } from 'shared/settings'

import { TextButton } from '../components/button'
import { Layout } from '../components/layout'
import { pluginsWithDescription } from '../svgo/plugins'
import { cls } from '../util'
import * as styles from './settings.css'

interface IHeaderProps {
  onSaveClick(): void
  onCloseClick(): void
}

const Header: React.FC<IHeaderProps> = ({ onCloseClick, onSaveClick }) => (
  <div>
    Settings{' '}
    <a
      href="https://github.com/svg/svgo#what-it-can-do"
      target="_blank"
      {...cls(styles.learnMore)}
    >
      learn more
    </a>
    <div {...cls(styles.buttons)}>
      <TextButton onClick={onSaveClick}>save</TextButton>
      <TextButton {...cls(styles.close)} onClick={onCloseClick}>
        close
      </TextButton>
    </div>
  </div>
)

interface ISettingsProps {
  settings: PluginsSettings
  onSaveClick(settings: PluginsSettings): void
  onCloseClick(): void
}

export const Settings = ({
  settings,
  onCloseClick,
  onSaveClick
}: ISettingsProps) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const initialState = pluginsWithDescription.map(x => ({
    id: x.id,
    name: x.name,
    active: settings[x.id]
  }))

  const onSave = () => {
    const el = ref.current
    if (!el) {
      return
    }

    const newSettings = Object.keys(settings).reduce<PluginsSettings>(
      (acc, id) => {
        acc[id as keyof PluginsSettings] = el.querySelector<HTMLInputElement>(
          '#' + id
        )!.checked
        return acc
      },
      {} as PluginsSettings
    )

    onSaveClick(newSettings)
  }

  return (
    <div {...cls(styles.container)}>
      <Layout
        theme="dark"
        header={<Header onSaveClick={onSave} onCloseClick={onCloseClick} />}
      >
        <div {...cls(styles.items)} ref={ref}>
          {initialState.map(x => (
            <div {...cls(styles.item)} key={x.id}>
              <label htmlFor={x.id}>
                <input id={x.id} type="checkbox" defaultChecked={x.active} />
              </label>
              <label htmlFor={x.id} {...cls(styles.label)}>
                {x.name}
                <br />
                <span>({x.id})</span>
              </label>
            </div>
          ))}
        </div>
      </Layout>
    </div>
  )
}
