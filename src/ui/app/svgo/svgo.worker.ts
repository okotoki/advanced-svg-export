import { PluginsSettings } from 'shared/settings'

import { optimize } from '.'
import { ISVGOptimized, ISVGProgress } from '../app'

const ctx: Worker = self as any

ctx.addEventListener('message', event => {
  const { svg, settings } = event.data as {
    svg: ISVGProgress
    settings: PluginsSettings
  }

  console.log(event.data)
  console.log('Worker received message')
  const lbl = 'optimizing ' + svg.id
  console.time(lbl)

  optimize(svg.svgOriginal, settings, { multipass: true }).then(x => {
    console.timeEnd(lbl)

    const res: ISVGOptimized = {
      ...svg,
      isDone: true,
      svgOptimized: x.data,
      width: x.info.width,
      height: x.info.height
    }
    ctx.postMessage(res)
  })
})

export default (null as any) as typeof Worker
