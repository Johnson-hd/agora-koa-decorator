import { Context } from 'koa'

import { HttpMethod, route, controller } from '../../../src'
import authMiddleware from '../../middlewares/auth'

@controller('/user')
export default class User {
  @route('/info', HttpMethod.GET, authMiddleware)
  async getUserInfo(ctx: Context) {
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
