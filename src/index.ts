import { Context, Next, Middleware } from 'koa'
import Router from 'koa-router'

import { parseDir } from './utils'
import { HttpMethod } from './model'

export const router = new Router()

export { HttpMethod }

/**
 * Route装饰器
 * @param path 路径
 * @param method 方法
 * @param middleware 中间件
 */
export const Route = (path: string, method?: HttpMethod, ...middleware: Array<Middleware>) => {
  // 方法装饰器，target类的原型对象
  return (target: any, key?: string | symbol, descriptor?: any): void => {
    if (!target.router) {
      target.router = new Router()
    }
    const callback = async (ctx: Context, next: Next) => {
      await descriptor.value(ctx, next)
    }
    target.router[(method || 'GET').toLowerCase()](path || '/', ...middleware, callback)
  }
}

/**
 * Controller装饰器
 * @param path 路径
 * @param method 方法
 * @param middleware 中间件
 */
export const Controller = (path: string, ...middleware: Array<Middleware>) => {
  return (target: any): void => {
    // 在Route装饰器中，已经将router绑定在原型上，这里可以直接拿到
    if (!target.prototype.router) {
      target.prototype.router = new Router()
    }
    router.use(path || '/', ...middleware, target.prototype.router.routes(), target.prototype.router.allowedMethods())
  }
}

/**
 * 入口，用来require dir下的ts文件
 * @param dir 使用装饰器的文件夹目录
 * @param ext .ts后缀会被加载
 */
export const bootstrap = (dir: string, ext = '.ts') => {
  parseDir(dir).forEach(file => {
    file.endsWith(ext) && require(file)
  })
}
