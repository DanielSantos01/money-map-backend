// import { UserConroller } from "../controllers";
import UserConroller from "../controllers/UserController";
import { Router } from "express";

const router = Router();

router.route('/').post(
    UserConroller.create,
);

export default router;

module.exports = router;
