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

interface ISettingsProps extends IHeaderProps {
  settings: PluginsSettings
}

export const Settings = ({
  settings,
  onCloseClick,
  onSaveClick
}: ISettingsProps) => {
  const initialState = pluginsWithDescription.map(x => ({
    id: x.id,
    name: x.name,
    active: settings[x.id]
  }))

  return (
    <div {...cls(styles.container)}>
      <Layout
        theme="dark"
        header={
          <Header onSaveClick={onSaveClick} onCloseClick={onCloseClick} />
        }
      >
        <div {...cls(styles.items)}>
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

    // <div {...cls(styles.container)}>
    //   <div {...cls(styles.wrap)}>
    //     <div {...cls(styles.wrap2)}>
    //       <div {...cls(styles.header)}>
    //         Settings
    //         <div {...cls(styles.buttons)}>
    //           <div {...cls(styles.button)} onClick={onSaveClick}>
    //             save
    //           </div>
    //           <div {...cls(styles.button, styles.close)} onClick={onCloseClick}>
    //             close
    //           </div>
    //         </div>
    //       </div>
    //       <div {...cls(styles.items)}>
    //         {initialState.map(x => (
    //           <div key={x.id}>
    //             <label htmlFor={x.id}>
    //               <input id={x.id} type="checkbox" defaultChecked={x.active} />
    //             </label>
    //             <label htmlFor={x.id}>{x.name}</label>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
