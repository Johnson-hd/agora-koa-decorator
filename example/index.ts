import Koa from 'koa'
import KoaBodyParser from 'koa-bodyparser'
import path from 'path'

import { bootstrap, router } from '../src'

const app = new Koa()
const port = 8083 || process.env.PORT

bootstrap(path.resolve(__dirname, 'modules'))

app.use(KoaBodyParser()).use(router.routes())

app.on('error', (err, ctx) => {
  console.error(
    `[Completed] ${ctx.status} "${ctx.request.method} ${ctx.request.url} ${ctx.request.hostname} ${err.message}`,
  )
})

app.listen(port, () => {
  console.info(`Service is listening on port ${port}`)
})
