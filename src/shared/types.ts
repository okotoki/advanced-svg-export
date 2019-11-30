import { PluginsSettings } from './settings'

export interface ISerializedSVG {
  name: string
  id: string
  svg: Uint8Array
}

export interface IGlobalSettings {
  settings: PluginsSettings
  totalSaved: number
  version: number
}
