import { Router } from 'express';

import { CategoryController } from '../controllers';

const router = Router();

router.route('/').post(CategoryController.create);

router.route('/').get(CategoryController.list);

router.route('/:categoryId').get(CategoryController.read);

router
  .route('/:categoryId')
  .patch(CategoryController.read, CategoryController.patch);

router
  .route('/:categoryId')
  .delete(CategoryController.read, CategoryController.delete);

export default router;

module.exports = router;
