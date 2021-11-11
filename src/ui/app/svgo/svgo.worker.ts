import * as debug from 'debug'
import 'shared/debug'
import { getPluginsConfiguration, PluginsSettings } from 'shared/settings'
import { optimize } from '.'
import { ISVGOptimized, ISVGProgress } from './types'

const log = debug('[SVGO] Worker')
const ctx: Worker = self as any

ctx.addEventListener('message', event => {
  const { svg, settings } = event.data as {
    svg: ISVGProgress
    settings: PluginsSettings
  }

  log('Worker received message', event.data)
  const lbl = 'optimizing ' + svg.name
  log(lbl)

  const config = getPluginsConfiguration(settings, svg.name)
  const optimizedSVG = optimize(svg.svgOriginal, config)

  const res: ISVGOptimized = {
    ...svg,
    isDone: true,
    svgOptimized: optimizedSVG.data,
    width: optimizedSVG.info.width,
    exportName: svg.name.substr(0, 40),
    height: optimizedSVG.info.height
  }
  ctx.postMessage(res)
})

export default (null as any) as typeof Worker
