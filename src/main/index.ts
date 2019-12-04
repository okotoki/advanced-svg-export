import 'shared/debug'

import * as debug from 'debug'
import { createMessenger } from 'shared/messenger'
import { ISerializedSVG } from 'shared/types'

import { getSettings, getTotalSaved, getUserId, set } from './store'
import version from './version'

const log = debug('[SVGO] Main')
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
  messenger.send.selectionChanged(els.filter(x => !!x.svg.length))
}

const sendInitialized = async () => {
  const [settings, totalSaved, userId, selection] = await Promise.all([
    getSettings(),
    getTotalSaved(),
    getUserId(),
    getSerializedSelection(figma.currentPage.selection)
  ])

  messenger.send.initialized({
    svgs: selection,
    userId,
    settings,
    totalSaved,
    version
  })
}

function start() {
  sendInitialized()

  figma.on('selectionchange', () => {
    log('Selection changed')
    sendSerializedSelection(figma.currentPage.selection)
  })
}

start()
