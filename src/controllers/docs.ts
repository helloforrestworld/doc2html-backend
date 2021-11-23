import { cdnPrefix } from '../config';
import DocsModel from '../models/docs';

class DocsCtrl {
  async create(ctx: any) {
    const file = ctx.request.files?.file;
    const wholePath = (file as any).path;
    const path = wholePath.match(/\/public\/doc.*/);
    if (path) {
      const doc = await new DocsModel({
        url: cdnPrefix + path,
        name: file.name,
      }).save();
      ctx.body = {
        rcode: 0,
        data: doc,
      };
    } else {
      ctx.body = {
        rcode: 1,
        errmsg: '上传失败',
      };
    }
  }
}

export default new DocsCtrl();
