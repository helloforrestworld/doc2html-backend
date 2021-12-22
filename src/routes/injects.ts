import Router from '@koa/router';
import { apiPrefix, cdnPrefix } from '../config';
import injectsCtrl from '../controllers/injects';

const router = new Router({ prefix: apiPrefix + '/injects' });
const { create, getAll, get, update, remove, checkInjectExist } = injectsCtrl;

router.get('/', getAll);
router.get('/:id', get);
router.post('/', create);
router.patch('/:id', checkInjectExist, update);
router.delete('/:id', checkInjectExist, remove);

export default router;
