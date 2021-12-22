import path from 'path';
import ArticleModel from '../models/articles';
import docs2html from '../utils/docs2html';
import { EInjectType, IInject } from '../types/common';
class ArticleCtl {
  async find(ctx: any) {
    let { page = 1, pageSize = 10, keyword = '' } = ctx.query;
    page = Math.max(page * 1, 1);
    pageSize = Math.max(pageSize * 1, 1);
    const articles = await ArticleModel.find({
      $or: [{ name: new RegExp(keyword) }, { remark: new RegExp(keyword) }],
    })
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    ctx.body = articles;
  }

  async findById(ctx: any) {
    const article = await ArticleModel.findById(ctx.params.id);
    ctx.body = article;
  }

  async create(ctx: any) {
    const reqBody = ctx.request.body;
    let { url: docUrl, injects = [] } = reqBody;
    const matchResult = docUrl.match(/public\/doc\/(.*)/);

    if (!matchResult) {
      ctx.throw(400, 'url is not correct');
    }

    docs2html({
      filePath: path.resolve(__dirname, '../../public/doc', matchResult[1]),
      name: reqBody.name,
      targetPath: path.resolve(__dirname, '../../public/dist'),
      scripts: injects
        .filter((item: IInject) => item.type === EInjectType.脚本)
        .map((item: IInject) => item.content),
      styles: injects
        .filter((item: IInject) => item.type === EInjectType.样式)
        .map((item: IInject) => item.content),
    });
    const article = await new ArticleModel({ ...reqBody }).save();
    ctx.body = article;
  }

  async update(ctx: any) {

  }
}

export default new ArticleCtl();
