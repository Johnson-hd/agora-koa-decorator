import { Context } from 'koa'

import { HttpMethod, Route, Controller } from '../../../src'
import authMiddleware from '../../middlewares/auth'
import logMiddleware from '../../middlewares/log'

@Controller('/order', logMiddleware, authMiddleware)
export default class Order {
  @Route('/list', HttpMethod.GET)
  async getList(ctx: Context) {
    ctx.body = {
      code: 0,
      msg: 'success',
      data: [
        {
          orderId: 1,
          orderName: '订单1',
        },
        {
          orderId: 2,
          orderName: '订单2',
        },
      ],
    }
  }

  @Route('/:id', HttpMethod.GET)
  async getInfoById(ctx: Context) {
    const { id } = ctx.params
    ctx.body = {
      code: 0,
      msg: 'success',
      data: {
        orderId: id,
        orderName: `订单${id}`,
      },
    }
  }
}
