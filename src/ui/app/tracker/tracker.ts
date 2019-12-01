import { PluginsSettings } from 'shared/settings'

import * as mixpanel from './patchedMixpanel'

let trackerEnabled = true

if (!process.env.MIXPANEL_KEY) {
  console.error(`Mixpanel key missing.
$> cat .env
MIXPANEL_KEY=<YOUR_KEY_GOES_HERE>`)
  trackerEnabled = false
}

mixpanel.init(process.env.MIXPANEL_KEY!, {
  disable_cookie: true,
  disable_persistence: true
})

export type Tracker = ReturnType<typeof createTracker>

export function createTracker() {
  return {
    init: (version: number, userId: string) => {
      if (!trackerEnabled) {
        return
      }
      mixpanel.identify(userId)
      mixpanel.register({
        version
      })
    },
    started: () => {
      if (!trackerEnabled) {
        return
      }
      mixpanel.track('appStarted')
    },
    settingsOpened: () => {
      if (!trackerEnabled) {
        return
      }
      mixpanel.track('settingsOpened')
    },
    settingsChanged: (
      settings: PluginsSettings,
      restoredDefaults?: boolean
    ) => {
      if (!trackerEnabled) {
        return
      }
      mixpanel.track('settingsChanged', {
        ...settings,
        restoredDefaults: !!restoredDefaults
      })
    },
    exportInitiated: (exportAll?: boolean) => {
      if (!trackerEnabled) {
        return
      }
      mixpanel.track('exportInitiated', {
        exportAll: !!exportAll
      })
    }
  }
}
