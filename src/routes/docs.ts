import Router from '@koa/router';
import { apiPrefix, cdnPrefix } from '../config';
import docsCtrl from '../controllers/docs';

const router = new Router({ prefix: apiPrefix + '/docs' });

router.post('/', docsCtrl.create);

export default router;
