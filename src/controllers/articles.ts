import ArticleModel from '../models/articles';

class ArticleCtl {
  async find(ctx: any) {
    let { page = 1, pageSize = 10, keyword = '' } = ctx.query;
    page = Math.max(page * 1, 1);
    pageSize = Math.max(pageSize * 1, 1);
    const articles = await ArticleModel.find({
      $or: [
        { name: new RegExp(keyword) },
        { remark: new RegExp(keyword) },
      ],
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
    const article = await new ArticleModel({ ...ctx.request.body }).save();
    ctx.body = article;
  }
}

export default new ArticleCtl();
