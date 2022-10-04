import { Router } from 'express';

import { SubcategoryController } from '../controllers';

const router = Router();

router.route('/').post(SubcategoryController.create);

router.route('/').get(SubcategoryController.list);

router.route('/:subcategoryId').get(SubcategoryController.read);

router
  .route('/:subcategoryId')
  .patch(SubcategoryController.read, SubcategoryController.patch);

router
  .route('/:subcategoryId')
  .delete(SubcategoryController.read, SubcategoryController.delete);

export default router;

module.exports = router;
