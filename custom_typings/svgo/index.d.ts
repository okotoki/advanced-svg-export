declare namespace SVGO {
  import { PluginConfig } from 'svgo'

  export interface Plugin {
    type: 'perItem' | 'perItemReverse' | 'full'
    active: boolean
    description: string
    params: PluginConfig
    fn: (item: Object, params?: PluginConfig) => void
  }
}

declare module 'svgo/lib/svgo/js2svg' {
  const e: (
    data: string,
    config: Object
  ) => {
    data: string
    info: { width: number; height: number }
  }
  export = e
}

declare module 'svgo/lib/svgo/svg2js' {
  const e: (data: string, cb: (x: any) => void) => void
  export = e
}

declare module 'svgo/lib/svgo/plugins' {
  const e: (data: Object, info: Object, plugins: SVGO.Plugin[][]) => Object
  export = e
}

declare module 'svgo/plugins/cleanupAttrs' {
  const e: SVGO.Plugin
  export = e
}

declare module 'svgo/plugins/cleanupEnableBackground' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/cleanupIDs' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/cleanupListOfValues' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/cleanupNumericValues' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/collapseGroups' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/convertColors' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/convertEllipseToCircle' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/convertPathData' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/convertShapeToPath' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/convertStyleToAttrs' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/convertTransform' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/inlineStyles' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/mergePaths' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/minifyStyles' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/moveElemsAttrsToGroup' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/moveGroupAttrsToElems' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/prefixIds' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeComments' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeDesc' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeDimensions' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeDoctype' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeEditorsNSData' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeEmptyAttrs' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeEmptyContainers' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeEmptyText' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeHiddenElems' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeMetadata' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeNonInheritableGroupAttrs' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeRasterImages' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeScriptElement' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeStyleElement' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeTitle' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeUnknownsAndDefaults' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeUnusedNS' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeUselessDefs' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeUselessStrokeAndFill' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeViewBox' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeXMLNS' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/removeXMLProcInst' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/reusePaths' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/sortAttrs' {
  const e: SVGO.Plugin
  export = e
}
declare module 'svgo/plugins/sortDefsChildren' {
  const e: SVGO.Plugin
  export = e
}
