import * as React from 'react'
import { subscribe } from 'shared/messenger'
import { IExportSVG } from 'shared/types'

import * as styles from './app.css'
import { Button, TextButton } from './components/button'
import { Layout } from './components/layout'
import { File } from './file'
import { Settings } from './settings'
import { defaultPluginsSettings } from './svgo/plugins'
import SVGOWorker from './svgo/svgo.worker'
import { cls, saveAsZip, uIntToString } from './util'

const svgoWorker = new SVGOWorker(undefined as any)

interface ISVG {
  id: string
  name: string
  svgOriginal: string
}

export interface ISVGProgress extends ISVG {
  isDone: false
}

export interface ISVGOptimized extends ISVG {
  isDone: true
  svgOptimized: string
  width: number
  height: number
}

interface IState {
  svgs: (ISVGProgress | ISVGOptimized)[]
}

const initialState = {
  svgs: []
}

const convert = (svgs: IExportSVG[]): ISVGProgress[] =>
  svgs.map(el => ({
    id: el.id,
    name: el.name,
    svgOriginal: uIntToString(el.svg),
    isDone: false
  }))

interface IHeaderProps {
  onSettingsClick(): void
}

const Header: React.FC<IHeaderProps> = ({ onSettingsClick }) => (
  <div>
    Optimized SVG Export{' '}
    <TextButton className={styles.headerButton} onClick={onSettingsClick}>
      settings
    </TextButton>
  </div>
)

export const App = () => {
  const [state, setState] = React.useState<IState>(initialState)
  const [showSettings, setShowSettings] = React.useState(false)

  React.useEffect(() => {
    const unsubscribe = subscribe({
      selectionChanged: els => {
        const svgs = convert(els)
        setState(_ => ({ svgs }))
        ;[...svgs]
          .sort((a, b) => a.svgOriginal.length - b.svgOriginal.length)
          .map(svg => svgoWorker.postMessage(svg))
      }
    })

    svgoWorker.onmessage = ({ data }: { data: ISVGOptimized }) => {
      console.log('Received Optimized SVG', data)

      setState(state => ({
        svgs: state.svgs.map(svg => (svg.id === data.id ? data : svg))
      }))
    }

    return () => {
      unsubscribe()
      svgoWorker.onmessage = null
    }
  }, [])

  const l = state.svgs.length

  const closeSettings = () => setShowSettings(false)
  const openSettings = () => setShowSettings(true)

  return (
    <>
      <Layout header={<Header onSettingsClick={openSettings} />}>
        {l ? (
          <div {...cls(styles.files)}>
            {state.svgs.map(svg => (
              <File el={svg} key={svg.id} />
            ))}
            <div {...cls(styles.buttonWrap)}>
              {l > 1 ? (
                <Button
                  onClick={() => saveAsZip(state.svgs as ISVGOptimized[])}
                  disabled={!!state.svgs.find(x => !x.isDone)}
                >
                  Export {l} layers
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className={styles.noLayersSelected}>
            Select at least one layer for export
          </div>
        )}
      </Layout>

      {showSettings ? (
        <Settings
          onCloseClick={closeSettings}
          onSaveClick={closeSettings}
          settings={defaultPluginsSettings}
        />
      ) : null}
    </>
  )
}
