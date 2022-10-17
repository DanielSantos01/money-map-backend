import { Router } from 'express';

import UserRouter from './UserRoutes';
import CategoryRoutes from './CategoryRoutes';
import SubcategoryRoutes from './SubcategoryRoutes';
import CostsRouter from './CostsRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/category', CategoryRoutes);
router.use('/subcategory', SubcategoryRoutes);
router.use('/costs', CostsRouter);

router.route('/').get((req, res) => {
  res.send('Made with 💚 and &lt; &#x0002F; &gt; by MoneyMap');
});

export default router;

module.exports = router;
