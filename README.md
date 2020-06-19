## agora-koa-decorator
> agora-koa-decorator

### 安装
```bash
yarn add agora-koa-decorator
```

### 使用

#### 基础用法
```bash
// index.ts 入口
import Koa from 'koa'
import { bootstrap, router } from 'agora-koa-decorator'

const app = new Koa()

bootstrap(path.resolve(__dirname, 'your controller dir path'))

router.prefix('/api') // if you want to add router baseURL
app.use(router.routes())

// xx.controller.ts
import { Controller, Route, HttpMethod } from 'agora-koa-decorator'

@Controller('/xx')
class XX {
  // visit by /xx/yy post
  @Route('/yy', HttpMethod.POST)
  async postYY(ctx: Context) {
    ctx.body = {
      code: 0,
      msg: 'success',
    }
  }

  // visit by /xx/zz get
  @Route('/zz', HttpMethod.GET)
  async getZZ(ctx: Context) {
    ctx.body = {
      code: 0,
      msg: 'success',
      data: {
        name: 'zz'
      },
    }
  }
}
```

#### 中间件
```bash
// xx.controller.ts
import { Controller, Route, HttpMethod } from 'agora-koa-decorator'
import youMiddleware from 'xxxx'

@Controller('/xx', youMiddleware) // 类的子路由也会先走这个中间件
class XX {
  @Route('/yy', HttpMethod.POST)
  async postYY(ctx: Context) {
    ctx.body = {
      code: 0,
      msg: 'success',
    }
  }

  @Route('/zz', HttpMethod.GET, youMiddleware) // 针对某一个子路由使用中间件
  async getZZ(ctx: Context) {
    ctx.body = {
      code: 0,
      msg: 'success',
      data: {
        name: 'zz'
      },
    }
  }
}
```
```
