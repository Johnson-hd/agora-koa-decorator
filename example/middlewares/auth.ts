import { Context } from 'Koa'

const auth = async (ctx: Context, next) => {
  if (!ctx.auth) {
    ctx.response.status = 401
    return
  }
  next()
}

export default auth
