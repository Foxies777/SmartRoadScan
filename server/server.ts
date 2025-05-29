import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reportRoutes from "./routes/report.routes";
import detectionRoutes from './routes/detection.routes';
import authRoutes from './routes/user.routes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/mydb";


mongoose.connect(MONGO_URL, {
  dbName: "SmartRoadScanDB",
  retryWrites: true,
  w: "majority",
  appName: "SmartRoadScan",
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log("✅ Подключено к MongoDB"))
  .catch((err) => console.error("❌ Ошибка подключения к MongoDB:", err));


app.use(cors()); 
app.use(express.json()); 


app.use("/api/reports", reportRoutes);
app.use('/api/detection', detectionRoutes);
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});