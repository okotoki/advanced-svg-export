import * as React from 'react'

const replaceAt = (str: string, index: number, replacement: string) =>
  str.substr(0, index) + replacement + str.substr(index + replacement.length)

const initial = 'optimizing'
const symbols = '◘◙◚◛▙▟▛▜▚▞⚆⚇⚈⚉░▓▧▨▩▖▗▘▝▁▂▃▄▅▆▔▀╔╦═╗'
const totalIterations = 25

export const Loader = ({ className }: { className?: string }) => {
  const [state, setState] = React.useState(initial)

  React.useEffect(() => {
    const l = initial.length

    let timeouts: number[] = []

    const cb = (i: number, j: number) => {
      setState(a => {
        if (i === totalIterations - 1) {
          return initial
        } else {
          return replaceAt(
            i % 6 === 0 ? initial : a,
            j,
            symbols[Math.floor(Math.random() * symbols.length)]
          )
        }
      })

      if (i === totalIterations - 1) {
        const to = setTimeout(run, 1000)
        timeouts = [(to as any) as number]
      }
    }
    const run = () => {
      for (let i = 0; i < totalIterations; i++) {
        const j = Math.floor(Math.random() * l)

        const to = setTimeout(() => {
          cb(i, j)
        }, i * 120)

        timeouts.push((to as any) as number)
      }
    }

    run()
    return () => {
      timeouts.map(x => clearTimeout(x))
    }
  }, [])

  return <div {...{ className }}>{state}</div>
}
