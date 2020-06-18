import Koa from 'koa'
import path from 'path'

import { load } from '../src'

const app = new Koa()
const apiRouter = load(path.resolve(__dirname, 'modules'))
const port = 8083 || process.env.PORT

app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

app.on('error', (err, ctx) => {
  console.error(
    `[Completed] ${ctx.status} 0 "${ctx.request.method} ${ctx.request.url} ${ctx.request.hostname} ${err.message}`,
  )
})

app.listen(port, () => {
  console.info(`OA service listening on port ${port}!`)
})
