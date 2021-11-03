import Router from '@koa/router';

const router = new Router();

router.prefix('/api');

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

export default router;
