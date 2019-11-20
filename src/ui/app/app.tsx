import * as React from 'react'
import { IExportSVG } from 'shared/types'

import * as styles from './app.css'
import SVGOWorker from './svgo/svgo.worker'

const decode = (arr: Uint8Array): string => new TextDecoder('utf-8').decode(arr)

const svgoWorker = new SVGOWorker(undefined as any)

interface Result {
  original: string
  optimized: string
}

export const App = () => {
  const [r, setResult] = React.useState<Result>()
  const [name, setName] = React.useState<string>()

  onmessage = event => {
    const data = event.data.pluginMessage as IExportSVG
    const svg = decode(data.svg)
    setName(data.name)

    svgoWorker.postMessage(svg)
    svgoWorker.onmessage = x => {
      const optimizedSvg = x.data

      setResult({
        original: svg,
        optimized: optimizedSvg
      })

      svgoWorker.onmessage = null
    }
    console.log(svg)
    // console.log(optimize(svg))
    // const selectedElement =
    //   typeof data !== 'undefined' ? (JSON.parse(data) as Rect[]) : undefined
    // console.log('Selected Elements', selectedElement)
    // if (!!selectedElement) {
    //   setRects(selectedElement)
    // }
  }

  const getUrl = (x: string) => (
    <a href={URL.createObjectURL(new Blob([x]))} download={name + '.svg'}>
      Download
    </a>
  )

  return (
    <div className={styles.container}>
      {!!r ? (
        <>
          <div>
            Original: <div dangerouslySetInnerHTML={{ __html: r.original }} />
          </div>
          <div>
            Optimized: <div dangerouslySetInnerHTML={{ __html: r.optimized }} />
          </div>
          <div>
            Compressed to{' '}
            {Math.round((r.optimized.length / r.original.length) * 1000) / 10}%
            of original size{' '}
          </div>
          <div>{getUrl(r.optimized)}</div>
        </>
      ) : (
        <h1>Select element you'd like to export</h1>
      )}
    </div>
  )
}
