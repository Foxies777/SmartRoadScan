import express from "express";
import { getReports, createReport } from "../controllers/report.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getReports);
router.post("/",  createReport);

export default router;
