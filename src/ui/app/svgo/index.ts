import js2svg from 'svgo/lib/svgo/js2svg'
import SVGOplugins from 'svgo/lib/svgo/plugins'
import svg2js from 'svgo/lib/svgo/svg2js'

import { pluginsByType } from './plugins'

const js2svgConfig = {
  indent: '  ',
  pretty: true
}

interface SVGJS {
  data: string
  info: { width: number; height: number }
  error?: any
}

export function optimizeOnce(svgstr: string, callback: (x: SVGJS) => void) {
  svg2js(svgstr, svgjs => {
    if (svgjs.error) {
      callback(svgjs)
      return
    }

    svgjs = SVGOplugins(svgjs, { input: 'string' }, pluginsByType)

    callback(js2svg(svgjs, js2svgConfig))
  })
}

interface IConfig {
  multipass?: boolean
}

export function optimize(svgstr: string, config: IConfig = {}) {
  return new Promise<SVGJS>((resolve, reject) => {
    const maxPassCount = config.multipass ? 10 : 1
    let counter = 1
    let prevSize = Number.POSITIVE_INFINITY

    const cb = (svgjs: SVGJS) => {
      if (svgjs.error) {
        reject(svgjs.error)
        return
      }

      if (++counter < maxPassCount && svgjs.data.length < prevSize) {
        prevSize = svgjs.data.length
        optimizeOnce(svgjs.data, cb)
      } else {
        resolve(svgjs)
      }
    }

    optimizeOnce(svgstr, cb)
  })
}
