import { PluginsSettings } from 'shared/settings'
import cleanupAttrs from 'svgo/plugins/cleanupAttrs'
import cleanupEnableBackground from 'svgo/plugins/cleanupEnableBackground'
import cleanupIDs from 'svgo/plugins/cleanupIDs'
import cleanupListOfValues from 'svgo/plugins/cleanupListOfValues'
import cleanupNumericValues from 'svgo/plugins/cleanupNumericValues'
import collapseGroups from 'svgo/plugins/collapseGroups'
import convertColors from 'svgo/plugins/convertColors'
import convertEllipseToCircle from 'svgo/plugins/convertEllipseToCircle'
import convertPathData from 'svgo/plugins/convertPathData'
import convertShapeToPath from 'svgo/plugins/convertShapeToPath'
import convertStyleToAttrs from 'svgo/plugins/convertStyleToAttrs'
import convertTransform from 'svgo/plugins/convertTransform'
import inlineStyles from 'svgo/plugins/inlineStyles'
import mergePaths from 'svgo/plugins/mergePaths'
import minifyStyles from 'svgo/plugins/minifyStyles'
import moveElemsAttrsToGroup from 'svgo/plugins/moveElemsAttrsToGroup'
import moveGroupAttrsToElems from 'svgo/plugins/moveGroupAttrsToElems'
import removeComments from 'svgo/plugins/removeComments'
import removeDesc from 'svgo/plugins/removeDesc'
import removeDimensions from 'svgo/plugins/removeDimensions'
import removeDoctype from 'svgo/plugins/removeDoctype'
import removeEditorsNSData from 'svgo/plugins/removeEditorsNSData'
import removeEmptyAttrs from 'svgo/plugins/removeEmptyAttrs'
import removeEmptyContainers from 'svgo/plugins/removeEmptyContainers'
import removeEmptyText from 'svgo/plugins/removeEmptyText'
import removeHiddenElems from 'svgo/plugins/removeHiddenElems'
import removeMetadata from 'svgo/plugins/removeMetadata'
import removeNonInheritableGroupAttrs from 'svgo/plugins/removeNonInheritableGroupAttrs'
import removeRasterImages from 'svgo/plugins/removeRasterImages'
import removeScriptElement from 'svgo/plugins/removeScriptElement'
import removeStyleElement from 'svgo/plugins/removeStyleElement'
import removeTitle from 'svgo/plugins/removeTitle'
import removeUnknownsAndDefaults from 'svgo/plugins/removeUnknownsAndDefaults'
import removeUnusedNS from 'svgo/plugins/removeUnusedNS'
import removeUselessDefs from 'svgo/plugins/removeUselessDefs'
import removeUselessStrokeAndFill from 'svgo/plugins/removeUselessStrokeAndFill'
import removeViewBox from 'svgo/plugins/removeViewBox'
import removeXMLNS from 'svgo/plugins/removeXMLNS'
import removeXMLProcInst from 'svgo/plugins/removeXMLProcInst'
import reusePaths from 'svgo/plugins/reusePaths'
import sortAttrs from 'svgo/plugins/sortAttrs'
import sortDefsChildren from 'svgo/plugins/sortDefsChildren'

// the order is from https://github.com/svg/svgo/blob/master/.svgo.yml
// Some are commented out if they have no default action.
export const pluginsData = {
  removeDoctype,
  removeXMLProcInst,
  removeComments,
  removeMetadata,
  removeXMLNS,
  removeEditorsNSData,
  cleanupAttrs,
  inlineStyles,
  minifyStyles,
  convertStyleToAttrs,
  cleanupIDs,
  // prefixIds,
  removeRasterImages,
  removeUselessDefs,
  cleanupNumericValues,
  cleanupListOfValues,
  convertColors,
  removeUnknownsAndDefaults,
  removeNonInheritableGroupAttrs,
  removeUselessStrokeAndFill,
  removeViewBox,
  cleanupEnableBackground,
  removeHiddenElems,
  removeEmptyText,
  convertShapeToPath,
  moveElemsAttrsToGroup,
  moveGroupAttrsToElems,
  collapseGroups,
  convertPathData,
  convertTransform,
  convertEllipseToCircle,
  removeEmptyAttrs,
  removeEmptyContainers,
  mergePaths,
  removeUnusedNS,
  // This currently throws an error
  // removeOffCanvasPaths,
  reusePaths,
  sortAttrs,
  sortDefsChildren,
  removeTitle,
  removeDesc,
  removeDimensions,
  // removeAttrs,
  // removeElementsByAttr,
  // removeAttributesBySelector,
  // addClassesToSVGElement,
  removeStyleElement,
  removeScriptElement
  // addAttributesToSVGElement,
}

// Arrange plugins by type - this is what plugins() expects
function arrangePluginsByType(plugins: SVGO.Plugin[]) {
  return plugins
    .map(item => [item])
    .reduce((arr, item) => {
      const last = arr[arr.length - 1]

      if (last && item[0].type === last[0].type) {
        last.push(item[0])
      } else {
        arr.push(item)
      }
      return arr
    }, [] as SVGO.Plugin[][])
}

export const pluginsByType = arrangePluginsByType(Object.values(pluginsData))

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
    id: 'convertEllipseToCircle',
    name: 'Convert non-eccentric <ellipse> to <circle>'
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
    id: 'reusePaths',
    name: 'Replace duplicate elements with links'
  }
]
