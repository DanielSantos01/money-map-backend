import { Router } from 'express';

import { CategoryController } from '../controllers';

const router = Router();

router.route('/').post(CategoryController.create);

router.route('/').get(CategoryController.list);

router.route('/:userId').get(CategoryController.read);

router
  .route('/:userId')
  .patch(CategoryController.read, CategoryController.patch);

router
  .route('/:userId')
  .delete(CategoryController.read, CategoryController.delete);

export default router;

module.exports = router;
