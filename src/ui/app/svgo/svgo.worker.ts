import { optimize } from '.'

const ctx: Worker = self as any

ctx.addEventListener('message', event => {
  const svg = event.data

  console.log('Worker received message')
  console.time('optimizing')

  optimize(svg, { multipass: true }).then(x => {
    console.timeEnd('optimizing')
    ctx.postMessage(x.data)
  })
})

export default (null as any) as typeof Worker
