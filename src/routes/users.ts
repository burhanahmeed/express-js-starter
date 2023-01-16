import express from 'express';
import user from '../controllers/UsersController';
const router = express.Router();

router.get('/:id', user.get);
router.get('/', user.list);

export default router;
