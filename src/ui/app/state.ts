import { PluginsSettings } from 'shared/settings'
import { IGlobalSettings } from 'shared/types'

import { ISVGOptimized, ISVGProgress } from './svgo/types'

interface IStateInitial extends Partial<IGlobalSettings> {
  svgs?: []
  initialized: false
}

interface IStateReady extends IGlobalSettings {
  svgs: (ISVGProgress | ISVGOptimized)[]
  initialized: true
}

export type State = IStateInitial | IStateReady

type Action<K, V = void> = V extends void ? { type: K } : { type: K; data: V }

type Actions =
  | Action<'INITIALIZE', IStateReady>
  | Action<'SELECTION_CHANGED', ISVGProgress[]>
  | Action<'OPTIMIZED_SVG', ISVGOptimized>
  | Action<'SETTINGS_CHANGED', PluginsSettings>
  | Action<'TOTAL_VALUE_INC', number>

export const initialState: State = {
  initialized: false
}

export const reducer = (state: State, action: Actions): State => {
  console.log('Dispatch fired', action.type, action.data)
  if (action.type === 'INITIALIZE') {
    return action.data
  }
  // only can be non-initialized before initialize message
  const s = state as IStateReady
  switch (action.type) {
    case 'SELECTION_CHANGED':
      return {
        ...s,
        svgs: action.data
      }
    case 'OPTIMIZED_SVG':
      return {
        ...s,
        svgs: s.svgs.map(svg => (svg.id === action.data.id ? action.data : svg))
      }
    case 'SETTINGS_CHANGED':
      return {
        ...s,
        settings: action.data
      }
    case 'TOTAL_VALUE_INC':
      return {
        ...s,
        totalSaved: s.totalSaved + action.data
      }
    default:
      throw Error(`Unknown action ${action}`)
  }
}
