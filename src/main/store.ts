import { defaultPluginsSettings, PluginsSettings } from 'shared/settings'
import { uuid } from 'shared/utils'

export function get(key: 'userId'): Promise<string | undefined>
export function get(key: 'settings'): Promise<PluginsSettings | undefined>
export function get(key: 'totalSaved'): Promise<number | undefined>
export function get(key: string) {
  return figma.clientStorage.getAsync(key)
}

export function set(key: 'userId', value: string): Promise<void>
export function set(key: 'settings', value: PluginsSettings): Promise<void>
export function set(key: 'totalSaved', value: number): Promise<void>

export function set(key: string, value: number | string | object) {
  return figma.clientStorage.setAsync(key, value)
}

export const getSettings = async () => {
  let settings = defaultPluginsSettings

  try {
    const s = await get('settings')

    if (typeof s === 'undefined') {
      set('settings', settings)
    } else {
      settings = s
    }
  } catch (e) {
    console.error('[SVGO] Settings retrieving error', e)
    set('settings', settings)
  }

  return settings
}

export const getTotalSaved = async () => {
  let totalSaved = 0

  try {
    const t = await get('totalSaved')

    if (typeof t === 'undefined') {
      set('totalSaved', totalSaved)
    } else {
      totalSaved = t
    }
  } catch (e) {
    console.error('[SVGO] TotalSaved retrieving error', e)
    set('totalSaved', totalSaved)
  }

  return totalSaved
}

export const getUserId = async () => {
  let userId = uuid()

  try {
    const id = await get('userId')

    if (typeof id === 'undefined') {
      set('userId', userId)
    } else {
      userId = id
    }
  } catch (e) {
    console.error('[SVGO] TotalSaved retrieving error', e)
    set('userId', userId)
  }

  return userId
}
