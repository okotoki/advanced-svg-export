import * as React from 'react'
import { createMessenger } from 'shared/messenger'
import { PluginsSettings } from 'shared/settings'

import styles from './app.css'
import { TextButton } from './components/button'
import { Layout } from './components/layout'
import { Loader } from './components/loader'
import { File } from './file'
import { Settings } from './settings'
import { initialState, reducer } from './state'
import { serializedToProgress } from './svgo'
import SVGOWorker from './svgo/svgo.worker'
import { ISVGOptimized, ISVGProgress } from './svgo/types'
import { createTracker } from './tracker/tracker'
import { cls, getSize, saveAsZip } from './util'

const messenger = createMessenger('iframe')
const tracker = createTracker()
const svgoWorker = new SVGOWorker(undefined as any)

const sendToWorker = (
  svgs: ISVGProgress[] | undefined,
  settings: PluginsSettings
) => {
  if (!svgs || !svgs.length) {
    return
  } else {
    ;[...svgs]
      .sort((a, b) => a.svgOriginal.length - b.svgOriginal.length)
      .forEach(svg => svgoWorker.postMessage({ svg, settings }))
  }
}

const totalSizeGreaterThan = (
  els: (ISVGProgress | ISVGOptimized)[],
  size: number
) =>
  !els.reduce((acc, el) => {
    acc -= getSize(el.svgOriginal)
    return acc <= 0 ? 0 : acc
  }, size)

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
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const [showSettings, setShowSettings] = React.useState(false)
  console.log('AppX re-render')

  React.useEffect(() => {
    console.log('Use Effect run')
    messenger.subscribe({
      initialized: msg => {
        console.log('[SVGO] Initialized', msg)
        const svgs = serializedToProgress(msg.svgs)
        sendToWorker(svgs, msg.settings!)

        dispatch({
          type: 'INITIALIZE',
          data: { ...msg, svgs, initialized: true }
        })

        tracker.init(msg.version, msg.userId)
        tracker.started()
      },
      selectionChanged: els => {
        const svgs = serializedToProgress(els)

        sendToWorker(svgs, state.settings!)
        dispatch({ type: 'SELECTION_CHANGED', data: svgs })
      }
    })

    svgoWorker.onmessage = ({ data }: { data: ISVGOptimized }) => {
      // console.log('Received Optimized SVG', data)
      dispatch({ type: 'OPTIMIZED_SVG', data })
    }

    return () => {
      messenger.unsubscribe()
      svgoWorker.onmessage = null
    }
  }, [state.settings])

  if (!state.initialized) {
    return null
  }

  const l = state.svgs.length

  const closeSettings = () => setShowSettings(false)
  const openSettings = () => {
    setShowSettings(true)
    tracker.settingsOpened()
  }

  const onSettingsChanged = (
    settings: PluginsSettings,
    defaultsRestored: boolean,
    keepOpen?: boolean
  ) => {
    const svgs = state.svgs
    const redoSvgs = svgs.map(
      x =>
        ({
          svgOriginal: x.svgOriginal,
          id: x.id,
          isDone: false,
          name: x.name
        } as ISVGProgress)
    )
    dispatch({ type: 'SETTINGS_CHANGED', data: settings })
    dispatch({ type: 'SELECTION_CHANGED', data: redoSvgs })

    messenger.send.settingsChanged(settings)
    sendToWorker(redoSvgs, settings)

    if (!keepOpen) {
      closeSettings()
    }
    tracker.settingsChanged(settings, defaultsRestored)
  }

  /*
  Plugin uses <a href="https://github.com/svg/svgo/">SVGO</a> – modular SVG optimizer.<br />
  Each option represents SVGO plugin (learn more) or restore default configuration.<br/>
  <br/>
  Configure plugins:
  */

  const incTotalValue = (sizeDiff: number) => {
    messenger.send.totalSavedChanged(state.totalSaved + sizeDiff)
    dispatch({ type: 'TOTAL_VALUE_INC', data: sizeDiff })
  }

  const onExportOne = (sizeDiff: number) => {
    incTotalValue(sizeDiff)
    tracker.exportInitiated()
  }

  const onExportAll = () => {
    const sizeDiff = state.svgs.reduce((acc, svg) => {
      if (!svg.isDone) {
        return acc
      }

      return acc + getSize(svg.svgOriginal) - getSize(svg.svgOptimized)
    }, 0)

    incTotalValue(sizeDiff)
    saveAsZip(state.svgs as ISVGOptimized[])
    tracker.exportInitiated(true)
  }

  const optimizingFinished = !state.svgs.find(x => !x.isDone)

  return (
    <>
      {l ? (
        <Layout
          header={
            <Header
              showExportButton={optimizingFinished && l > 1}
              count={l}
              onExportClick={onExportAll}
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
              state.svgs.map(svg => (
                <File el={svg} key={svg.id} onExport={onExportOne} />
              ))
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
          totalSaved={state.totalSaved}
          onCloseClick={closeSettings}
          onSettingsChanged={onSettingsChanged}
          settings={state.settings}
        />
      ) : null}
    </>
  )
}
