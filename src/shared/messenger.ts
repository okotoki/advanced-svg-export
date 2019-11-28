import { PluginsSettings } from './settings'
import { IExportSVG, IGlobalSettings } from './types'

function sendToUI<T>(type: keyof Handlers, data: T) {
  figma.ui.postMessage({
    type,
    data
  })
}

function sendToMain<T>(type: keyof MainHandlers, data: T) {
  parent.postMessage({ pluginMessage: { type, data } }, '*')
}

export function createUIMessenger() {
  return {
    settingsChanged: (settings: PluginsSettings) =>
      sendToMain('settingsChanged', settings)
  }
}

export function createMainMessenger() {
  return {
    selectionChanged: (els: IExportSVG[]) => sendToUI('selectionChanged', els),
    initialized: (props: IGlobalSettings) => sendToUI('initialized', props)
  }
}

type Handlers = ReturnType<typeof createMainMessenger>
type MainHandlers = ReturnType<typeof createUIMessenger>

export function subscribeToUI(handlers: Partial<MainHandlers>) {
  figma.ui.onmessage = (
    data:
      | {
          type: keyof MainHandlers
          data: any
        }
      | any
  ) => {
    console.log('Message from UI', data)

    if (typeof data === 'object' && data !== null) {
      const d = data as {
        type: keyof MainHandlers
        [k: string]: any
      }

      if (d.type && typeof d.data !== 'undefined') {
        const cb = handlers[d.type]

        if (!!cb) {
          cb(d.data)
        }
      }
    }
  }
}

export function subscribe(handlers: Partial<Handlers>) {
  onmessage = event => {
    const data = event.data.pluginMessage as
      | {
          type: keyof Handlers
          data: any
        }
      | undefined

    if (typeof data === 'undefined') {
      return
    }
    const cb = handlers[data.type]

    if (typeof cb !== 'undefined') {
      cb(data.data)
    }
  }

  return () => {
    onmessage = null
  }
}
