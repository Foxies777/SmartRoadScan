import express from "express";
import { getReports, createReport, getFilteredReports } from "../controllers/report.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getReports);
router.post("/",  createReport);
router.get('/reports', getFilteredReports);
export default router;
