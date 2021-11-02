import path from 'path';
import Koa from 'koa';
import Router from '@koa/router';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import koaMount from 'koa-mount';

const app = new Koa();
const router = new Router();

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

router.get('/', (ctx, next) => {
  ctx.body = 'Hello,World';
});

const domain = 'http://localhost:3000';
router.post('/upload', (ctx) => {
  const file = ctx.request.files?.file;
  const wholePath = (file as any).path;
  const path = wholePath.match(/\/public.*/);
  if (path) {
    ctx.body = {
      rcode: 0,
      path: domain + path,
    };
  } else {
    ctx.body = {
      rcode: 1,
      errmsg: '上传失败',
    };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server is starting at port 3000');
});
