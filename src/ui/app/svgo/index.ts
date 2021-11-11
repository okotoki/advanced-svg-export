import { PluginsConfiguration } from 'shared/settings'
import { ISerializedSVG } from 'shared/types'
import { optimize as svgoOptimize } from 'svgo/dist/svgo.browser'
import { uIntToString } from '../util'
import { ISVGProgress } from './types'

export function optimize(svgstr: string, settings: PluginsConfiguration): any {
  return svgoOptimize(svgstr, { plugins: settings, multipass: true })
}

export const serializedToProgress = (svgs: ISerializedSVG[]): ISVGProgress[] =>
  svgs.map(el => ({
    id: el.id,
    name: el.name,
    svgOriginal: uIntToString(el.svg),
    isDone: false
  }))
