import * as React from 'react'
import { subscribe } from 'shared/messenger'
import { defaultPluginsSettings } from 'shared/settings'
import { IExportSVG } from 'shared/types'

import * as styles from './app.css'
import { TextButton } from './components/button'
import { Layout } from './components/layout'
import { Loader } from './components/loader'
import { File } from './file'
import { Settings } from './settings'
import SVGOWorker from './svgo/svgo.worker'
import { cls, getSize, saveAsZip, uIntToString } from './util'

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

const totalSizeGreaterThan = (
  els: (ISVGProgress | ISVGOptimized)[],
  size: number
) =>
  !els.reduce((acc, el) => (acc <= 0 ? 0 : acc - getSize(el.svgOriginal)), size)

interface IHeaderProps {
  count: number
  showExportButton: boolean
  onSettingsClick(): void
  onExportClick(): void
}

const Header: React.FC<IHeaderProps> = ({
  onSettingsClick,
  count,
  onExportClick,
  showExportButton
}) => (
  <div>
    {showExportButton ? (
      <TextButton {...cls(styles.exportButton)} onClick={onExportClick}>
        export {count} layers
      </TextButton>
    ) : null}
    <TextButton className={styles.settingsButton} onClick={onSettingsClick}>
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

  const optimizingFinished = !state.svgs.find(x => !x.isDone)

  return (
    <>
      {l ? (
        <Layout
          header={
            <Header
              showExportButton={optimizingFinished && l > 1}
              count={l}
              onExportClick={() => saveAsZip(state.svgs as ISVGOptimized[])}
              onSettingsClick={openSettings}
            />
          }
        >
          <div {...cls(styles.files)}>
            {!optimizingFinished && totalSizeGreaterThan(state.svgs, 100000) ? (
              <div {...cls(styles.loader)}>
                <Loader />
              </div>
            ) : (
              state.svgs.map(svg => <File el={svg} key={svg.id} />)
            )}
          </div>
        </Layout>
      ) : (
        <div className={styles.noLayersSelected}>
          Select at least one layer for export
        </div>
      )}

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
