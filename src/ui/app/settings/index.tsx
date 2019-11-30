import * as React from 'react'
import { defaultPluginsSettings, PluginsSettings } from 'shared/settings'
import { isEqual } from 'shared/utils'

import { Layout } from '../components/layout'
import { pluginsWithDescription } from '../svgo/plugins'
import { cls, formatSize } from '../util'
import { Header } from './header'
import * as styles from './settings.css'

interface ISettingsProps {
  totalSaved: number
  settings: PluginsSettings
  onSaveClick(settings: PluginsSettings, keepOpen?: boolean): void
  onCloseClick(): void
}

interface ISettingsState {
  id: keyof PluginsSettings
  name: string
  active: boolean
}

const settingsToState = (settings: PluginsSettings): ISettingsState[] =>
  pluginsWithDescription.map(x => ({
    id: x.id,
    name: x.name,
    active: settings[x.id]
  }))

const stateToSettings = (state: ISettingsState[]): PluginsSettings =>
  state.reduce((acc, setting) => {
    acc[setting.id] = !!setting.active
    return acc
  }, {} as PluginsSettings)

export const Settings = ({
  totalSaved,
  settings: initialSettings,
  onCloseClick,
  onSaveClick
}: ISettingsProps) => {
  const [state, setState] = React.useState(settingsToState(initialSettings))
  const [latestSaveTs, setLatestSaveTs] = React.useState(0)

  const onSave = (keepOpen?: boolean) => {
    onSaveClick(stateToSettings(state), keepOpen)
  }

  const onRestoreDefaultsClick = () => {
    setState(settingsToState(defaultPluginsSettings))
    onSaveClick(defaultPluginsSettings, true)
    setLatestSaveTs(Date.now())
  }

  const onSettingChanged = (id: keyof PluginsSettings, checked: boolean) => {
    const newSettings = state.map(setting =>
      setting.id === id ? { ...setting, active: checked } : setting
    )
    setLatestSaveTs(Date.now())
    setState(newSettings)
    onSaveClick(stateToSettings(newSettings), true)
    // onSave(true)
  }

  const restoreDefaultsDisabled = isEqual(
    stateToSettings(state),
    defaultPluginsSettings
  )

  return (
    <div {...cls(styles.container)}>
      <Layout
        {...cls(styles.contentWrapper)}
        theme="dark"
        header={
          <Header
            latestSaveTs={latestSaveTs}
            restoreDefaultsDisabled={restoreDefaultsDisabled}
            onRestoreDefaults={onRestoreDefaultsClick}
            onSaveClick={onSave}
            onCloseClick={onCloseClick}
          />
        }
      >
        <div {...cls(styles.content)}>
          <div {...cls(styles.contentHeader)}>
            Configure:{' '}
            <a
              href="https://github.com/svg/svgo#what-it-can-do"
              target="_blank"
              {...cls(styles.learnMore)}
            >
              learn more
            </a>
          </div>
          {state.map(x => (
            <div {...cls(styles.item)} key={x.id}>
              <label htmlFor={x.id}>
                <input
                  id={x.id}
                  type="checkbox"
                  checked={x.active}
                  onChange={event =>
                    onSettingChanged(x.id, event.target.checked)
                  }
                />
              </label>
              <label htmlFor={x.id} {...cls(styles.label)}>
                {x.name}
                <br />
                <span>({x.id})</span>
              </label>
            </div>
          ))}
          <div {...cls(styles.footer)}>
            {totalSaved ? (
              <div {...cls(styles.totalSaved)}>
                Saved you <b>{formatSize(totalSaved)}</b> overall
              </div>
            ) : null}
            Crafted for humans 🤓 of Figma community worldwide 🌏.
            <br />
            {new Date().getFullYear() === 2019
              ? 2019
              : '2019 — ' + new Date().getFullYear()}{' '}
            © <a href="https://twitter.com/okotoki">Okotoki Software</a>
          </div>
        </div>
      </Layout>
    </div>
  )
}
