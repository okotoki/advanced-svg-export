import { PluginsSettings } from 'shared/settings'

export function get(key: 'settings'): Promise<PluginsSettings | undefined>
export function get(key: 'totalSaved'): Promise<number | undefined>
export function get(key: string) {
  return figma.clientStorage.getAsync(key)
}

export function set(key: 'settings', value: PluginsSettings): Promise<void>
export function set(key: 'totalSaved', value: number): Promise<void>

export function set(key: string, value: number | string | object) {
  return figma.clientStorage.setAsync(key, value)
}
