import { Router } from 'express';

import UserRouter from './UserRoutes';
import CategoryRoutes from './CategoryRoutes';
import SubcategoryRoutes from './SubcategoryRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/category', CategoryRoutes);
router.use('/subcategory', SubcategoryRoutes);

router.route('/').get((req, res) => {
  res.send('Made with 💚 and &lt; &#x0002F; &gt; by MoneyMap');
});

export default router;

module.exports = router;
