import { Context } from 'koa'

import { HttpMethod, Route, Controller } from '../../../src' // 引入打包前
// import { HttpMethod, Route, Controller } from '../../../lib/src/' // 引入打包后

@Controller('/other')
export default class Other {
  @Route('/health', HttpMethod.GET)
  async getHealth(ctx: Context) {
    ctx.body = new Date()
  }
}
