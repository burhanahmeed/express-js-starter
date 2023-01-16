import express from 'express';
import user from '../controllers/UsersController';
import { checkUser } from '../middlewares/authentication';

const router = express.Router();

router.post('/auth', user.auth);

// middleware check
router.use(checkUser);

router.get('/me', user.me);
router.get('/:id', user.get);
router.get('/', user.list);

router.post('/', user.create);
router.post('/password', user.updatePassword);

router.put('/:id', user.update);

export default router;
