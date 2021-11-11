export type PluginsSettings = typeof defaultPluginsSettings & {
  prefixIds: string | boolean
}

export type SVGOSettings = Partial<PluginsSettings> & {}

export type PluginNames = keyof typeof defaultPluginsSettings

export const defaultPluginsSettings = {
  removeDoctype: true,
  removeXMLProcInst: true,
  removeComments: true,
  removeMetadata: true,
  removeXMLNS: false,
  removeEditorsNSData: true,
  cleanupAttrs: true,
  inlineStyles: true,
  mergeStyles: true,
  minifyStyles: true,
  convertStyleToAttrs: true,
  cleanupIDs: true,
  prefixIds: true,
  removeRasterImages: false,
  removeUselessDefs: true,
  cleanupNumericValues: true,
  cleanupListOfValues: false,
  convertColors: true,
  removeUnknownsAndDefaults: true,
  removeNonInheritableGroupAttrs: true,
  removeUselessStrokeAndFill: true,
  removeViewBox: true,
  cleanupEnableBackground: true,
  removeHiddenElems: true,
  removeEmptyText: true,
  convertShapeToPath: true,
  moveElemsAttrsToGroup: true,
  moveGroupAttrsToElems: true,
  collapseGroups: true,
  convertPathData: true,
  convertTransform: true,
  convertEllipseToCircle: true,
  removeEmptyAttrs: true,
  removeEmptyContainers: true,
  mergePaths: true,
  removeUnusedNS: true,
  // This currently throws an error
  // removeOffCanvasPaths: true,
  reusePaths: false,
  sortAttrs: false,
  sortDefsChildren: true,
  removeTitle: true,
  removeDesc: true,
  removeDimensions: false,
  removeAttrs: false,
  // removeElementsByAttr: true,
  // removeAttributesBySelector: true,
  // addClassesToSVGElement: true,
  removeStyleElement: false,
  removeScriptElement: false
  // addAttributesToSVGElement,
}

export type PluginsConfiguration = {
  name: keyof PluginsSettings
  params?: {
    [k: string]: any
  }
}[]

export function getPluginsConfiguration(
  settings: PluginsSettings,
  prefix: string
): PluginsConfiguration {
  return Object.keys(settings).reduce((config, key) => {
    const k = key as keyof PluginsSettings
    const active = settings[k]
    if (!active) return config

    let p: {} | undefined
    if (k === 'prefixIds') {
      p = {
        prefix
      }
    } else if (k === 'removeAttrs') {
      p = {
        attrs: '*:(fill|stroke):none'
      }
    }

    if (!!p) {
      config.push({ name: k, params: p })
    } else {
      config.push({ name: k })
    }

    return config
  }, [] as PluginsConfiguration)
}
