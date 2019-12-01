/**
 * /shared – contains shared code for both iframe (/ui) and main thread sandbox (/main) environments
 */

export function isUndefined(val: any | undefined) {
  return typeof val === 'undefined'
}

export function isObject(val: any) {
  return typeof val === 'object' && val !== null
}

export function isEqual(
  x: object | Array<any> | (() => any) | RegExp,
  y: object | Array<any> | (() => any) | RegExp
): boolean {
  if (x === null || x === undefined || y === null || y === undefined) {
    return x === y
  }
  // after this just checking type of one would be enough
  if (x.constructor !== y.constructor) {
    return false
  }
  // if they are functions, they should exactly refer to same one (because of closures)
  if (x instanceof Function) {
    return x === y
  }
  // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
  if (x instanceof RegExp) {
    return x === y
  }
  if (x === y || x.valueOf() === y.valueOf()) {
    return true
  }
  if (Array.isArray(x) && Array.isArray(y) && x.length !== y.length) {
    return false
  }

  // if they are dates, they must had equal valueOf
  if (x instanceof Date) {
    return false
  }

  // if they are strictly equal, they both need to be object at least
  if (!(x instanceof Object)) {
    return false
  }
  if (!(y instanceof Object)) {
    return false
  }

  // recursive object equality check
  const p = Object.keys(x)
  return (
    Object.keys(y).every(i => p.indexOf(i) !== -1) &&
    p.every(i =>
      isEqual((x as { [k: string]: any })[i], (y as { [k: string]: any })[i])
    )
  )
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // tslint:disable-next-line
    const r = (Math.random() * 16) | 0
    // tslint:disable-next-line
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
