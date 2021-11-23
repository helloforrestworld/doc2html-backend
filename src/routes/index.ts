import fs from 'fs'
import Koa from 'koa';

export default (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.ts') return

    const router = require(`./${file}`).default;
    app.use(router.routes())
    app.use(router.allowedMethods())
  })
}
