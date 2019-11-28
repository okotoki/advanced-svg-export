import { PluginsSettings } from 'shared/settings'
import js2svg from 'svgo/lib/svgo/js2svg'
import SVGOplugins from 'svgo/lib/svgo/plugins'
import svg2js from 'svgo/lib/svgo/svg2js'

import { pluginsByType } from './plugins'

const js2svgConfig = {
  indent: '  ',
  pretty: true
}

interface ISVGJS {
  data: string
  info: { width: number; height: number }
  error?: any
}

export function optimizeOnce(
  svgstr: string,
  settings: PluginsSettings,
  callback: (x: ISVGJS) => void
) {
  svg2js(svgstr, svgjs => {
    if (svgjs.error) {
      callback(svgjs)
      return
    }

    console.log('>>>', settings)
    svgjs = SVGOplugins(svgjs, { input: 'string' }, pluginsByType(settings))

    callback(js2svg(svgjs, js2svgConfig))
  })
}

interface IConfig {
  multipass?: boolean
}

export function optimize(
  svgstr: string,
  settings: PluginsSettings,
  config: IConfig = {}
) {
  return new Promise<ISVGJS>((resolve, reject) => {
    const maxPassCount = config.multipass ? 10 : 1
    let counter = 1
    let prevSize = Number.POSITIVE_INFINITY

    const cb = (svgjs: ISVGJS) => {
      if (svgjs.error) {
        reject(svgjs.error)
        return
      }

      if (++counter < maxPassCount && svgjs.data.length < prevSize) {
        prevSize = svgjs.data.length
        optimizeOnce(svgjs.data, settings, cb)
      } else {
        resolve(svgjs)
      }
    }

    optimizeOnce(svgstr, settings, cb)
  })
}
