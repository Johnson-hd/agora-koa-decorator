import { Context } from 'koa'

import { HttpMethod, Route, Controller } from '../../../src'

@Controller('/other')
export default class Other {
  @Route('/health', HttpMethod.GET)
  async getHealth(ctx: Context) {
    ctx.body = new Date()
  }
}
