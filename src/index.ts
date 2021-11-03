import path from 'path';
import Koa from 'koa';
import Router from '@koa/router';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import koaMount from 'koa-mount';

import uploadRouter from './routes/upload';

const app = new Koa();

app.use(logger());
app.use(koaMount('/public', koaStatic(path.join(__dirname, '../public'))));
app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 上传目录
      uploadDir: path.join(__dirname, '../public'),
      // 保留文件扩展名
      keepExtensions: true,
    },
  })
);

app.use(uploadRouter.routes()).use(uploadRouter.allowedMethods());

app.listen(3000, () => {
  console.log('server is starting at port 3000');
});
