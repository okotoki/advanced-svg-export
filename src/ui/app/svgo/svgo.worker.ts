import 'shared/debug'

import * as debug from 'debug'
import { PluginsSettings } from 'shared/settings'

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

  optimize(svg.svgOriginal, settings, { multipass: true }).then(x => {
    log(lbl)

    const res: ISVGOptimized = {
      ...svg,
      isDone: true,
      svgOptimized: x.data,
      width: x.info.width,
      exportName: svg.name.substr(0, 40),
      height: x.info.height
    }
    ctx.postMessage(res)
  })
})

export default (null as any) as typeof Worker
