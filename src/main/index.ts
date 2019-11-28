import { createMainMessenger, subscribeToUI } from 'shared/messenger'
import { defaultPluginsSettings } from 'shared/settings'
import { IExportSVG } from 'shared/types'

import { get, set } from './store'
import version from './version'

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
  width: 400,
  height: 300 // ,
  // position: 'last'
})

const messenger = createMainMessenger()

subscribeToUI({
  settingsChanged(settings) {
    set('settings', settings)
  }
})

const serialize = async (node: SceneNode): Promise<IExportSVG> => {
  const svg = await node.exportAsync({ format: 'SVG' })

  return {
    name: node.name,
    id: node.id,
    svg
  }
}

const sendSerializedSelection = async (selection: readonly SceneNode[]) => {
  const els = await Promise.all(selection.map(serialize))
  console.log('Serialized element: ', els)
  messenger.selectionChanged(els.filter(x => !!x.svg.length))
}

const sendInitialized = async () => {
  let settings = defaultPluginsSettings
  let totalSaved = 0

  try {
    const [s, t] = await Promise.all([get('settings'), get('totalSaved')])
    if (typeof s === 'undefined') {
      set('settings', settings)
    } else {
      settings = s
    }

    if (typeof t === 'undefined') {
      set('totalSaved', totalSaved)
    } else {
      totalSaved = t
    }
  } catch (e) {
    console.error('[SVGO] Settings retrieving error', e)
    set('settings', settings)
    set('totalSaved', totalSaved)
  }

  messenger.initialized({
    settings,
    totalSaved,
    version
  })
}

function start() {
  sendInitialized()

  setTimeout(() => {
    figma.on('selectionchange', () =>
      sendSerializedSelection(figma.currentPage.selection)
    )

    sendSerializedSelection(figma.currentPage.selection)
  }, 1000)
}

start()
