import { PluginsSettings } from 'shared/settings'

export const pluginsWithDescription: {
  id: keyof PluginsSettings
  name: string
}[] = [
  {
    id: 'cleanupAttrs',
    name: 'Cleanup attributes whitespace'
  },
  {
    id: 'inlineStyles',
    name: 'Inline styles'
  },
  {
    id: 'mergeStyles',
    name: 'Merge styles'
  },
  {
    id: 'removeAttrs',
    name: 'Remove (fill|stroke):none'
  },
  {
    id: 'removeDoctype',
    name: 'Remove doctype'
  },
  {
    id: 'removeXMLProcInst',
    name: 'Remove XML instructions'
  },
  {
    id: 'removeComments',
    name: 'Remove comments'
  },
  {
    id: 'removeMetadata',
    name: 'Remove <metadata>'
  },
  {
    id: 'removeTitle',
    name: 'Remove <title>'
  },
  {
    id: 'removeDesc',
    name: 'Remove <desc>'
  },
  {
    id: 'removeUselessDefs',
    name: 'Remove unused defs'
  },
  {
    id: 'removeXMLNS',
    name: 'Remove xmlns'
  },
  {
    id: 'removeEditorsNSData',
    name: 'Remove editor data'
  },
  {
    id: 'removeEmptyAttrs',
    name: 'Remove empty attrs'
  },
  {
    id: 'removeHiddenElems',
    name: 'Remove hidden elements'
  },
  {
    id: 'removeEmptyText',
    name: 'Remove empty text'
  },
  {
    id: 'removeEmptyContainers',
    name: 'Remove empty containers'
  },
  {
    id: 'removeViewBox',
    name: 'Remove viewBox'
  },
  {
    id: 'minifyStyles',
    name: 'Minify styles'
  },
  {
    id: 'cleanupEnableBackground',
    name: 'Remove/tidy enable-background'
  },
  {
    id: 'convertStyleToAttrs',
    name: 'Style to attributes'
  },
  {
    id: 'convertColors',
    name: 'Minify colors'
  },
  {
    id: 'convertPathData',
    name: 'Round/rewrite paths'
  },
  {
    id: 'convertTransform',
    name: 'Round/rewrite transforms'
  },
  {
    id: 'removeUnknownsAndDefaults',
    name: 'Remove unknowns & defaults'
  },
  {
    id: 'removeNonInheritableGroupAttrs',
    name: 'Remove unneeded group attrs'
  },
  {
    id: 'removeUselessStrokeAndFill',
    name: 'Remove useless stroke & fill'
  },
  {
    id: 'removeUnusedNS',
    name: 'Remove unused namespaces'
  },
  {
    id: 'cleanupIDs',
    name: 'Clean IDs'
  },
  {
    id: 'prefixIds',
    name: 'Prefix IDs'
  },
  {
    id: 'cleanupNumericValues',
    name: 'Round/rewrite numbers'
  },
  {
    id: 'cleanupListOfValues',
    name: 'Round/rewrite list of numbers'
  },
  {
    id: 'moveElemsAttrsToGroup',
    name: 'Move attrs to parent group'
  },
  {
    id: 'moveGroupAttrsToElems',
    name: 'Move group attrs to elements'
  },
  {
    id: 'collapseGroups',
    name: 'Collapse useless groups'
  },
  {
    id: 'removeRasterImages',
    name: 'Remove raster images'
  },
  {
    id: 'mergePaths',
    name: 'Merge paths'
  },
  {
    id: 'convertShapeToPath',
    name: 'Shapes to (smaller) paths'
  },
  {
    id: 'sortAttrs',
    name: 'Sort attrs'
  },
  {
    id: 'sortDefsChildren',
    name: 'Sort children of <defs>'
  },
  {
    id: 'removeDimensions',
    name: 'Prefer viewBox to width/height'
  },
  {
    id: 'removeStyleElement',
    name: 'Remove <style> elements'
  },
  {
    id: 'removeScriptElement',
    name: 'Remove <script> elements'
  },
  {
    id: 'convertEllipseToCircle',
    name: 'Convert non-eccentric <ellipse> to <circle>'
  },
  {
    id: 'reusePaths',
    name: 'Replace duplicate elements with links'
  }
]
