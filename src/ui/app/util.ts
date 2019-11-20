export function sum(a: number, b: number) {
  return a + b
}

export function formatSize(bytes: number) {
  return bytes < 1024 ? bytes + ' bytes' : f2(bytes / 1024) + 'k'
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
