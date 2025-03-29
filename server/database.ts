import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Загружаем переменные из .env

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/road_db";
console.log(MONGO_URL);

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log("✅ Подключено к MongoDB");
  } catch (error) {
    console.error("❌ Ошибка подключения к БД:", error);
    process.exit(1); // Завершаем процесс при ошибке
  }
};
