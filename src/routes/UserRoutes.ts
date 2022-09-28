import { Router } from 'express';

import { UserController } from '../controllers';

const router = Router();

router.route('/').post(UserController.create);

router.route('/:userId').get(UserController.read);

router.route('/:userId').patch(UserController.read, UserController.patch);

router.route('/:userId').delete(UserController.read, UserController.delete);

export default router;

module.exports = router;
