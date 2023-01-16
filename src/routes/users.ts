import express from 'express';
import user from '../controllers/UsersController';
const router = express.Router();

router.get('/me', user.me);
router.get('/:id', user.get);
router.get('/', user.list);

router.post('/', user.create);
router.post('/auth', user.auth);
router.post('/password', user.updatePassword);

router.put('/:id', user.update);

export default router;
