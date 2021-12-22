import { Next } from 'koa';
import InjectsModel from '../models/injects';

class InjectsCtrl {
  async getAll(ctx: any) {
    let { page = 1, pageSize = 10, keyword = '' } = ctx.query;
    page = Math.max(page * 1, 1);
    pageSize = Math.max(pageSize * 1, 1);
    const inject = await InjectsModel.find({
      $or: [{ name: new RegExp(keyword) }, { remark: new RegExp(keyword) }],
    })
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    ctx.body = inject;
  }

  async get(ctx: any) {
    const inject = await InjectsModel.findById(ctx.params.id);
    ctx.body = inject;
  }

  async create(ctx: any) {
    const reqBody = ctx.request.body;
    const inject = await new InjectsModel({ ...reqBody }).save();
    ctx.body = inject;
  }

  async update(ctx: any) {
    await ctx.state.inject.update({ ...ctx.request.body })
    ctx.body = ctx.state.inject
  }

  async remove(ctx: any) {
    await ctx.state.inject.delete()
    ctx.status = 204
  }

  async checkInjectExist(ctx: any, next: Next) {
    const inject = await InjectsModel.findById(ctx.params.id)

    if (!inject) {
      ctx.throw(404, '脚本不存在');
    }

    ctx.state.inject = inject;
    await next();
  }
}

export default new InjectsCtrl();
