import { Router } from 'express';
import { CostsController } from '../controllers';

const router = Router();

router.route('/').post(CostsController.create);
router.route('/').get(CostsController.readAll);
router.route('/:costsId?').get(CostsController.read);
router.route('/:costsId').patch(CostsController.read, CostsController.patch);
router.route('/:costsId').delete(CostsController.read, CostsController.delete);

router.route('/findUser/:userId').get(CostsController.listUserCost);
router.route('/add-money/:costsId').post(CostsController.read, CostsController.addMoney);
router.route('/remove-money/:costsId').post(CostsController.read, CostsController.removeMoney);

export default router;

module.exports = router;
