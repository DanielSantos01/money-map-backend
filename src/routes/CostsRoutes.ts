import { Router } from 'express';
import { CostsController } from '../controllers';

const router = Router();

router.route('/').post(CostsController.create);

export default router;

module.exports = router;
