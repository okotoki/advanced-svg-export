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
