import * as React from 'react'

import { LinkButton } from '../components/button'
import { ISVGOptimized, ISVGProgress } from '../svgo/types'
import { f2, formatSize, getSize, svgToUrl } from '../util'
import * as styles from './file.css'

const FileStats = ({ x }: { x: ISVGOptimized }) => {
  const sizeOriginal = getSize(x.svgOriginal)
  const sizeOptimized = getSize(x.svgOptimized)
  const savings = Math.round(f2(sizeOptimized / sizeOriginal) * 100)
  return (
    <>
      <div className={styles.size}>
        {formatSize(sizeOriginal)} → {formatSize(sizeOptimized)}{' '}
      </div>
      <span className={styles.savings}>{savings}%</span>
    </>
  )
}

interface IFileProps {
  el: ISVGOptimized | ISVGProgress
  onExport(sizeDiff: number): void
}
export const File = ({ el, onExport }: IFileProps) => {
  const onExportClick = () => {
    if (!el.isDone) {
      return
    }
    const sizeDiff = getSize(el.svgOriginal) - getSize(el.svgOptimized)
    onExport(sizeDiff)
  }
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
              onClick={onExportClick}
              download={el.exportName + '.svg'}
            >
              Export
            </LinkButton>
          </div>
        </>
      ) : null}
    </div>
  )
}
