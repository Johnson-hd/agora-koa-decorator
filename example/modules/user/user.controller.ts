import { Context } from 'koa'

import { HttpMethod, Route, Controller } from '../../../src'
import authMiddleware from '../../middlewares/auth'
import logMiddleware from '../../middlewares/log'

@Controller('/user', logMiddleware)
export default class User {
  @Route('/login', HttpMethod.POST)
  async login(ctx: Context) {
    ctx.body = {
      code: 0,
      msg: 'success',
    }
  }

  @Route('/info', HttpMethod.GET, authMiddleware)
  async getInfo(ctx: Context) {
    ctx.body = {
      code: 0,
      msg: 'success',
      data: {
        name: 'houdong',
        email: 'houdong@agora.io',
      },
    }
  }
}
