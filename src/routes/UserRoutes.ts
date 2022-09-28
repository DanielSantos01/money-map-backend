// import { UserConroller } from "../controllers";
import UserConroller from "../controllers/UserController";
import { Router } from "express";

const router = Router();

router.route('/').post(
    UserConroller.create,
);

router.route('/:userId').get(
    UserConroller.read,
);

router.route('/:userId').patch(
    UserConroller.read,
    UserConroller.patch,
);

export default router;

module.exports = router;
