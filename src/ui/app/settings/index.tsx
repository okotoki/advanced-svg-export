import * as React from 'react'

import { TextButton } from '../components/button'
import { Layout } from '../components/layout'
import { PluginsData, PluginsSettings } from '../svgo/plugins'
import { cls } from '../util'
import * as styles from './settings.css'

const plugins: { id: keyof PluginsData; name: string }[] = [
  {
    id: 'cleanupAttrs',
    name: 'Cleanup attributes whitespace'
  },
  {
    id: 'inlineStyles',
    name: 'Inline styles'
  },
  {
    id: 'removeDoctype',
    name: 'Remove doctype'
  },
  {
    id: 'removeXMLProcInst',
    name: 'Remove XML instructions'
  },
  {
    id: 'removeComments',
    name: 'Remove comments'
  },
  {
    id: 'removeMetadata',
    name: 'Remove <metadata>'
  },
  {
    id: 'removeTitle',
    name: 'Remove <title>'
  },
  {
    id: 'removeDesc',
    name: 'Remove <desc>'
  },
  {
    id: 'removeUselessDefs',
    name: 'Remove unused defs'
  },
  {
    id: 'removeXMLNS',
    name: 'Remove xmlns'
  },
  {
    id: 'removeEditorsNSData',
    name: 'Remove editor data'
  },
  {
    id: 'removeEmptyAttrs',
    name: 'Remove empty attrs'
  },
  {
    id: 'removeHiddenElems',
    name: 'Remove hidden elements'
  },
  {
    id: 'removeEmptyText',
    name: 'Remove empty text'
  },
  {
    id: 'removeEmptyContainers',
    name: 'Remove empty containers'
  },
  {
    id: 'removeViewBox',
    name: 'Remove viewBox'
  },
  {
    id: 'minifyStyles',
    name: 'Minify styles'
  },
  {
    id: 'cleanupEnableBackground',
    name: 'Remove/tidy enable-background'
  },
  {
    id: 'convertStyleToAttrs',
    name: 'Style to attributes'
  },
  {
    id: 'convertColors',
    name: 'Minify colors'
  },
  {
    id: 'convertPathData',
    name: 'Round/rewrite paths'
  },
  {
    id: 'convertTransform',
    name: 'Round/rewrite transforms'
  },
  {
    id: 'removeUnknownsAndDefaults',
    name: 'Remove unknowns & defaults'
  },
  {
    id: 'removeNonInheritableGroupAttrs',
    name: 'Remove unneeded group attrs'
  },
  {
    id: 'removeUselessStrokeAndFill',
    name: 'Remove useless stroke & fill'
  },
  {
    id: 'removeUnusedNS',
    name: 'Remove unused namespaces'
  },
  {
    id: 'cleanupIDs',
    name: 'Clean IDs'
  },
  {
    id: 'cleanupNumericValues',
    name: 'Round/rewrite numbers'
  },
  {
    id: 'cleanupListOfValues',
    name: 'Round/rewrite list of numbers'
  },
  {
    id: 'moveElemsAttrsToGroup',
    name: 'Move attrs to parent group'
  },
  {
    id: 'moveGroupAttrsToElems',
    name: 'Move group attrs to elements'
  },
  {
    id: 'collapseGroups',
    name: 'Collapse useless groups'
  },
  {
    id: 'removeRasterImages',
    name: 'Remove raster images'
  },
  {
    id: 'mergePaths',
    name: 'Merge paths'
  },
  {
    id: 'convertShapeToPath',
    name: 'Shapes to (smaller) paths'
  },
  {
    id: 'convertEllipseToCircle',
    name: 'Convert non-eccentric <ellipse> to <circle>'
  },
  {
    id: 'sortAttrs',
    name: 'Sort attrs'
  },
  {
    id: 'sortDefsChildren',
    name: 'Sort children of <defs>'
  },
  {
    id: 'removeDimensions',
    name: 'Prefer viewBox to width/height'
  },
  {
    id: 'removeStyleElement',
    name: 'Remove <style> elements'
  },
  {
    id: 'removeScriptElement',
    name: 'Remove <script> elements'
  },
  {
    id: 'reusePaths',
    name: 'Replace duplicate elements with links'
  }
]

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
  const initialState = plugins.map(x => ({
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
