import { Router } from 'express';

import UserRouter from './UserRoutes';

const router = Router();

router.use('/user', UserRouter);

router.route('/').get((req, res) => {
  res.send('Made with 💚 and &lt; &#x0002F; &gt; by MoneyMap');
});

export default router;

module.exports = router ;