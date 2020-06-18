import Koa from 'koa'
import path from 'path'
// import Router from 'koa-router'
// const router = new Router()

import { bootstrap, router } from '../src'
const app = new Koa()

const port = 8083 || process.env.PORT

// router.prefix('/api')
bootstrap(path.resolve(__dirname, 'modules'))
// app.use(userRouter.routes())
app.use(router.routes())

app.on('error', (err, ctx) => {
  console.error(
    `[Completed] ${ctx.status} "${ctx.request.method} ${ctx.request.url} ${ctx.request.hostname} ${err.message}`,
  )
})

app.listen(port, () => {
  console.info(`Service is listening on ort ${port}!`)
})
