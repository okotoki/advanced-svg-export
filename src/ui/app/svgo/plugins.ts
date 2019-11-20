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

export type PluginsData = typeof pluginsData

export const defaultPluginsSettings: { [k in keyof PluginsData]: boolean } = {
  removeDoctype: true,
  removeXMLProcInst: true,
  removeComments: true,
  removeMetadata: true,
  removeXMLNS: true,
  removeEditorsNSData: true,
  cleanupAttrs: true,
  inlineStyles: true,
  minifyStyles: true,
  convertStyleToAttrs: true,
  cleanupIDs: true,
  // prefixIds: true,
  removeRasterImages: true,
  removeUselessDefs: true,
  cleanupNumericValues: true,
  cleanupListOfValues: true,
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
  reusePaths: true,
  sortAttrs: true,
  sortDefsChildren: true,
  removeTitle: true,
  removeDesc: true,
  removeDimensions: true,
  // removeAttrs: true,
  // removeElementsByAttr: true,
  // removeAttributesBySelector: true,
  // addClassesToSVGElement: true,
  removeStyleElement: true,
  removeScriptElement: true
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

// interface ISettings {
//   plugins: { [k in keyof PluginData]: any }
// }

// function multipassCompress(settings: ISettings) {
//   // activate/deactivate plugins
//   Object.keys(settings.plugins).forEach(pluginName => {
//     pluginsData[pluginName].active = settings.plugins[pluginName]
//   })

//   // Set floatPrecision across all the plugins
//   const floatPrecision = Number(settings.floatPrecision)

//   for (const plugin of Object.values(pluginsData)) {
//     if (plugin.params && 'floatPrecision' in plugin.params) {
//       if (plugin === pluginsData.cleanupNumericValues && floatPrecision === 0) {
//         // 0 almost always breaks images when used on this plugin.
//         // Better to allow 0 for everything else, but switch to 1 for this plugin.
//         plugin.params.floatPrecision = 1
//       } else {
//         plugin.params.floatPrecision = floatPrecision
//       }
//     }
//   }

//   const svg = cloneParsedSvg(parsedSvg)
//   let svgData
//   let previousDataLength

//   while (svgData === undefined || svgData.length != previousDataLength) {
//     previousDataLength = svgData && svgData.length
//     plugins(svg, { input: 'string' }, optimisedPluginsData)
//     svgData = js2svg(svg, {
//       indent: '  ',
//       pretty: settings.pretty
//     }).data

//     yield {
//       data: svgData,
//       dimensions: getDimensions(svg)
//     }
//   }
// }

// interface IConfig {

// }

// function optimizeOnce(svgstr: string, config: IConfig , callback: () => void) {

//   SVG2JS(svgstr, function(svgjs) {
//       if (svgjs.error) {
//           callback(svgjs);
//           return;
//       }

//       svgjs = PLUGINS(svgjs, info, config.plugins);

//       callback(JS2SVG(svgjs, config.js2svg));
//   });
// };

// export function optimize(svgstr: string, ) {
//   function(svgstr, info) {
//     info = info || {};
//     return new Promise((resolve, reject) => {
//         if (this.config.error) {
//             reject(this.config.error);
//             return;
//         }

//         var config = this.config,
//             maxPassCount = config.multipass ? 10 : 1,
//             counter = 0,
//             prevResultSize = Number.POSITIVE_INFINITY,
//             optimizeOnceCallback = (svgjs) => {
//                 if (svgjs.error) {
//                     reject(svgjs.error);
//                     return;
//                 }

//                 info.multipassCount = counter;
//                 if (++counter < maxPassCount && svgjs.data.length < prevResultSize) {
//                     prevResultSize = svgjs.data.length;
//                     this._optimizeOnce(svgjs.data, info, optimizeOnceCallback);
//                 } else {
//                     if (config.datauri) {
//                         svgjs.data = encodeSVGDatauri(svgjs.data, config.datauri);
//                     }
//                     if (info && info.path) {
//                         svgjs.path = info.path;
//                     }
//                     resolve(svgjs);
//                 }
//             };

//         this._optimizeOnce(svgstr, info, optimizeOnceCallback);
//     });
// }
