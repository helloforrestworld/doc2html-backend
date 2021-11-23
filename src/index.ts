import path from 'path';
import Koa from 'koa';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import koaMount from 'koa-mount';
import cors from 'koa2-cors';
import mongoose from 'mongoose';

import { connectionStr, port } from './config'
import routing from './routes';

const app = new Koa();

mongoose.connect(connectionStr, {}, () => console.log('数据库连接成功...'))
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`)
  mongoose.connect(connectionStr, {}, () => console.log('数据库连接成功...'))
})

app.use(logger());
app.use(koaMount('/public', koaStatic(path.join(__dirname, '../public'))));
app.use(cors());
app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 上传目录
      uploadDir: path.join(__dirname, '../public/doc'),
      // 保留文件扩展名
      keepExtensions: true,
    },
  })
);

// 注册路由
routing(app);

app.listen(port, () => {
  console.log(`server is starting at port ${port}`);
});
