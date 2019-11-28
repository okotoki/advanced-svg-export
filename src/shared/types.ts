import { PluginsSettings } from './settings'

export interface IExportSVG {
  name: string
  id: string
  svg: Uint8Array
}

export interface IGlobalSettings {
  settings: PluginsSettings
  totalSaved: number
  version: number
}
