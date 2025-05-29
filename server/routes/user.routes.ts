import express from "express";
import { register, login, getUser } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/registration", register);
router.post("/login", login);
router.get('/:userId', authMiddleware, getUser)
export default router;
