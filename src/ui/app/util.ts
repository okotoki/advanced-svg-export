import { saveAs } from 'file-saver'
import JSZip from 'jszip'

import { ISVGOptimized } from './app'

export function svgToUrl(svg: string) {
  return URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
}

export function uIntToString(arr: Uint8Array): string {
  return new TextDecoder('utf-8').decode(arr)
}

export function getSize(str: string): number {
  return new Blob([str]).size
}

export function formatSize(bytes: number) {
  return bytes < 1024 ? bytes + ' bytes' : f2(bytes / 1024) + 'K'
}

export function floor(a: number, precision = 4) {
  return Math.floor(a * Math.pow(10, precision)) / Math.pow(10, precision)
}

export function f1(x: number) {
  return floor(x, 1)
}
export function f2(x: number) {
  return floor(x, 2)
}
export function f3(x: number) {
  return floor(x, 3)
}
export function f4(x: number) {
  return floor(x, 4)
}
export function f5(x: number) {
  return floor(x, 5)
}

export type ClassNameLike = undefined | null | boolean | string

/**
 * Filter out undefined, null, false and empty strings.
 * Throw on a `true` value.
 */
function filterClassNames(cs: ClassNameLike[]) {
  return cs.filter(c => {
    if (c === true) {
      throw new TypeError('Unexpected `true` value in classes')
    }
    return c !== null && c !== undefined && c !== '' && c !== false
  }) as string[]
}

/*
  Examples:
    classNames('foo') => foo
    classNames('foo', 'bar') => 'foo bar'
    classNames('foo', condition && 'bar', 'test') => condition = true => 'foo bar test'
                                                     condition = false => 'foo test'

    let style = {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
      f: 'f'
    }

    classNames(style.a, false && style.b, style.c, style.d)) => 'a c d'
*/
export function cls(...cs: ClassNameLike[]): { className: string | undefined } {
  const filtered = filterClassNames((cs || []) as ClassNameLike[]) as string[]

  return {
    className: filtered.length > 0 ? filtered.join(' ') : undefined
  }
}

export const saveAsZip = (svgs: ISVGOptimized[]) => {
  const zip = new JSZip()

  svgs.forEach(x => {
    zip.file(x.name + '.svg', x.svgOptimized, { binary: false })
  })

  zip.generateAsync({ type: 'blob' }).then(data => {
    saveAs(data, 'export.zip')
  })
}
