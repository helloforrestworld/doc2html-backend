import Router from '@koa/router';
import { apiPrefix } from '../config';
import articleCtl from '../controllers/articles'

const router = new Router({ prefix: apiPrefix + '/articles' });

router.get('/', articleCtl.find);

router.get('/:id', articleCtl.findById);

router.post('/', articleCtl.create);

router.patch('/:id');

router.delete('/:id');

export default router;
