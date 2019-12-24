import * as React from 'react'

import { LinkButton } from '../components/button'
import { ISVGOptimized, ISVGProgress } from '../svgo/types'
import { cls, f2, formatSize, getSize, svgToUrl } from '../util'
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

const Checkmark = () => (
  <span {...cls(styles.checkmark)}>
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5.71911L5.44944 9.58428L13 1"
        stroke="#2ef95d"
        strokeWidth="2"
      />
    </svg>
  </span>
)

interface IFileProps {
  el: ISVGOptimized | ISVGProgress
  onExport(sizeDiff: number): void
}

export const File = ({ el, onExport }: IFileProps) => {
  const [exportClicked, setExportClicked] = React.useState(false)

  const onExportClick = () => {
    if (!el.isDone) {
      return
    }
    const sizeDiff = getSize(el.svgOriginal) - getSize(el.svgOptimized)
    onExport(sizeDiff)
    setExportClicked(true)
  }

  return (
    <div className={styles.file}>
      <div className={styles.name}>
        {exportClicked ? (
          <span>
            <Checkmark />
          </span>
        ) : null}
        {el.name}
      </div>
      {el.isDone ? (
        <>
          {!exportClicked ? <FileStats x={el} key={el.id} /> : null}
          <div>
            <LinkButton
              size="small"
              href={svgToUrl(el.svgOptimized)}
              onClick={onExportClick}
              download={el.exportName + '.svg'}
            >
              Export{exportClicked ? ' again' : ''}
            </LinkButton>
          </div>
        </>
      ) : null}
    </div>
  )
}
