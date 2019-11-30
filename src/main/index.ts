import { createMessenger } from 'shared/messengerX'
import { ISerializedSVG } from 'shared/types'

import { getSettings, getTotalSaved, set } from './store'
import version from './version'

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
  width: 400,
  height: 300 // ,
  // position: 'last'
})

const messenger = createMessenger('main')
messenger.subscribe({
  settingsChanged(settings) {
    set('settings', settings)
  },
  totalSavedChanged(newTotal) {
    set('totalSaved', newTotal)
  }
})

const serialize = async (node: SceneNode): Promise<ISerializedSVG> => {
  const svg = await node.exportAsync({ format: 'SVG' })

  return {
    name: node.name,
    id: node.id,
    svg
  }
}

const getSerializedSelection = (selection: readonly SceneNode[]) =>
  Promise.all(selection.map(serialize))

const sendSerializedSelection = async (selection: readonly SceneNode[]) => {
  const els = await getSerializedSelection(selection)
  console.log('Serialized elements: ', els)
  messenger.send.selectionChanged(els.filter(x => !!x.svg.length))
}

const sendInitialized = async () => {
  const [settings, totalSaved, selection] = await Promise.all([
    getSettings(),
    getTotalSaved(),
    getSerializedSelection(figma.currentPage.selection)
  ])

  messenger.send.initialized({
    svgs: selection,
    settings,
    totalSaved,
    version
  })
}

function start() {
  sendInitialized()

  figma.on('selectionchange', () =>
    sendSerializedSelection(figma.currentPage.selection)
  )
}

start()
