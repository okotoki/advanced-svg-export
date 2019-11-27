import { IExportSVG } from './types'

function send<T>(type: keyof Handlers, data: T) {
  figma.ui.postMessage({
    type,
    data
  })
}

export function createMainMessenger() {
  return {
    selectionChanged: (els: IExportSVG[]) => send('selectionChanged', els)
  }
}

type Handlers = ReturnType<typeof createMainMessenger>

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
