import fs from 'fs'
import { Context } from 'koa'

/**
 * 解析文件夹，获取文件夹下的所有文件
 * @param dir 目录
 * @param files
 */
export function parseDir(dir: string, files?: string[]): string[] {
  files = files || []
  const _files = fs.readdirSync(dir)
  for (const i in _files) {
    const fileName = `${dir}/${_files[i]}`
    if (fs.statSync(fileName).isDirectory()) {
      parseDir(fileName, files)
    } else {
      files.push(fileName)
    }
  }
  return files
}

/**
 * 格式化返回数据的格式
 */
export async function formatResponse(descriptor: any, ctx: Context) {
  const ret = descriptor.value(ctx)
  if (ret != null) {
    try {
      const data = await Promise.resolve(ret)
      if (data != null) {
        // 正常格式
        ctx.body = data
      }
    } catch (err) {
      if (err) {
        const { code = err.code || 500, msg = err.message || err.msg || err.error || JSON.stringify(err), data } = err
        // 错误格式
        ctx.body = {
          code,
          msg,
          data,
        }
        ctx.status = 500
        // 非线上环境记录错误
        if (process.env.NODE_ENV != 'production') {
          console.trace(err)
        }
      }
    }
  }
}
