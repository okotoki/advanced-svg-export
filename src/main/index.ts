import { createMainMessenger } from 'shared/messenger'
import { IExportSVG } from 'shared/types'

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
  width: 400,
  height: 300 // ,
  // position: 'last'
})

const messenger = createMainMessenger()

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

sendSerializedSelection(figma.currentPage.selection)

figma.on('selectionchange', () =>
  sendSerializedSelection(figma.currentPage.selection)
)
