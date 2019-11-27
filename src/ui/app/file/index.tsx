import * as React from 'react'

import { ISVGOptimized, ISVGProgress } from '../app'
import { LinkButton } from '../components/button'
import { f2, formatSize, getSize, svgToUrl } from '../util'
import * as styles from './file.css'

const FileStats = ({ x }: { x: ISVGOptimized }) => {
  const sizeOriginal = getSize(x.svgOriginal)
  const sizeOptimized = getSize(x.svgOptimized)
  const savings = f2(sizeOptimized / sizeOriginal) * 100
  return (
    <>
      <div className={styles.size}>
        {formatSize(sizeOriginal)} → {formatSize(sizeOptimized)}{' '}
      </div>
      <span className={styles.savings}>{savings}%</span>
    </>
  )
}

export const File = ({ el }: { el: ISVGOptimized | ISVGProgress }) => {
  console.log('File Render', el)
  return (
    <div className={styles.file}>
      <div className={styles.name}>{el.name}</div>
      {el.isDone ? (
        <>
          <FileStats x={el} key={el.id} />
          <div>
            <LinkButton
              size="small"
              href={svgToUrl(el.svgOptimized)}
              download={el.name + '.svg'}
            >
              Export
            </LinkButton>
          </div>
        </>
      ) : null}
    </div>
  )
}
