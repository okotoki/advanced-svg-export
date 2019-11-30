import * as React from 'react'

import { usePrev } from '../util'

const removeClass = (el: HTMLDivElement | null, cls: string | undefined) => {
  if (el && !!cls) {
    el.classList.remove(cls)
    // forces browser layout re-render
    // tslint:disable-next-line
    void el.offsetWidth
  }
}

const addClass = (el: HTMLDivElement | null, cls: string | undefined) => {
  if (el && !!cls) {
    el.classList.add(cls)
  }
}

interface INotifyProps {
  duration: number
  latestTimestamp: number
  className?: string
  animationClassName?: string
}

export const Notify: React.FC<INotifyProps> = ({
  latestTimestamp,
  duration,
  children,
  className,
  animationClassName
}) => {
  const prevTimestamp = usePrev(latestTimestamp)
  const [isVisible, setVisible] = React.useState(latestTimestamp > 0)
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    let to: number
    const el = ref.current

    if (latestTimestamp !== prevTimestamp && prevTimestamp !== undefined) {
      if (isVisible) {
        clearTimeout(to!)
        removeClass(el, animationClassName)
      } else {
        setVisible(true)
      }
      addClass(el, animationClassName)
    }

    to = (setTimeout(() => {
      if (!isVisible) {
        return
      }

      setVisible(false)
      removeClass(el, animationClassName)
    }, duration) as any) as number

    return () => clearTimeout(to)
  }, [latestTimestamp, duration, isVisible])

  return (
    <div className={className} ref={ref}>
      {isVisible ? children : null}
    </div>
  )
}
