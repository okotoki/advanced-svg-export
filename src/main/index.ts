import { IExportSVG } from 'shared/types'

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
  width: 400,
  height: 300,
  position: 'last'
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
  console.log(selection)
  const el = await serialize(selection[0])
  console.log('Serialized element: ', el)

  figma.ui.postMessage(el)
}

sendSerializedSelection(figma.currentPage.selection)

figma.on('selectionchange', () =>
  sendSerializedSelection(figma.currentPage.selection)
)
