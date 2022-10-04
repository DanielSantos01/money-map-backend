import { Router } from 'express';
import { CostsController } from '../controllers';

const router = Router();

router.route('/').post(CostsController.create);

router.route('/:costsId').get(CostsController.read);

export default router;

module.exports = router;
