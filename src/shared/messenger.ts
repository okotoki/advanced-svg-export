import * as debug from 'debug'
import { isUndefined } from 'util'
import { PluginsSettings } from './settings'
import { IGlobalSettings, ISerializedSVG } from './types'
import { isObject } from './utils'

const log = debug('[SVGO] Messenger')

const iFrameToMain = {
  settingsChanged: (settings: PluginsSettings) =>
    send('main', 'settingsChanged', settings),
  totalSavedChanged: (newTotal: number) =>
    send('main', 'totalSavedChanged', newTotal)
}

const mainToIframe = {
  selectionChanged: (els: ISerializedSVG[]) =>
    send('iframe', 'selectionChanged', els),
  initialized: (props: IGlobalSettings & { svgs: ISerializedSVG[] }) =>
    send('iframe', 'initialized', props)
}

type IframeToMainMessages = typeof iFrameToMain
type MainToIframeMessages = typeof mainToIframe

type MessengerType = 'iframe' | 'main'

interface IMessenger<T, U> {
  send: T
  subscribe(handlers: Partial<U>): void
  unsubscribe(): void
}

interface IMessage<T> {
  type: keyof T
  data: any
}

function send<T>(to: 'iframe', type: keyof MainToIframeMessages, data: T): void
function send<T>(to: 'main', type: keyof IframeToMainMessages, data: T): void
function send<T>(
  to: MessengerType,
  type: keyof MainToIframeMessages | keyof IframeToMainMessages,
  data: T
) {
  const msg = {
    type,
    data
  }

  log(`Send '${type}' to ${to}`, data)

  if (to === 'iframe') {
    figma.ui.postMessage(msg)
  } else if (to === 'main') {
    parent.postMessage({ pluginMessage: msg }, '*')
  }
}

export function createMessenger(
  type: 'iframe'
): IMessenger<IframeToMainMessages, MainToIframeMessages>
export function createMessenger(
  type: 'main'
): IMessenger<MainToIframeMessages, IframeToMainMessages>

export function createMessenger(
  type: 'iframe' | 'main'
):
  | IMessenger<MainToIframeMessages, IframeToMainMessages>
  | IMessenger<IframeToMainMessages, MainToIframeMessages> {
  switch (type) {
    case 'main':
      if (isUndefined(figma)) {
        throw Error('Attempted to create a messanger on wrong side.')
      }
      return getMainMessenger()
    case 'iframe':
      return getIframeMessenger()
    default:
      throw Error('Unknown messenger type')
  }
}

function executeCb<T extends { [k: string]: (...x: any) => void }>(
  data: IMessage<T> | undefined,
  handlers: Partial<T>
) {
  if (
    isUndefined(data) ||
    !isObject(data) ||
    !data.type ||
    isUndefined(data.data)
  ) {
    return
  }

  const cb = handlers[data.type]
  if (!!cb) {
    log(`Message received '${data.type}'`, data.data)
    cb(data.data)
  }
}

function getIframeMessenger(): IMessenger<
  IframeToMainMessages,
  MainToIframeMessages
> {
  const subscribe = (handlers: Partial<MainToIframeMessages>) =>
    (onmessage = event => {
      const data = event.data.pluginMessage as
        | IMessage<MainToIframeMessages>
        | undefined

      executeCb(data, handlers)
    })

  return {
    send: iFrameToMain,
    subscribe,
    unsubscribe() {
      onmessage = null
    }
  }
}

function getMainMessenger(): IMessenger<
  MainToIframeMessages,
  IframeToMainMessages
> {
  const subscribe = (handlers: Partial<IframeToMainMessages>) =>
    (figma.ui.onmessage = (data: IMessage<IframeToMainMessages>) => {
      executeCb(data, handlers)
    })

  return {
    send: mainToIframe,
    subscribe,
    unsubscribe() {
      figma.ui.onmessage = undefined
    }
  }
}
