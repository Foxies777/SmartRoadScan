import mongoose from "mongoose";
import { Report } from "./models/Report";
require("dotenv").config(); // Используем CommonJS

// Подключаемся к MongoDB
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/road_db";

const seedReports = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Подключено к MongoDB, добавляем тестовые данные...");

    // Очищаем коллекцию перед добавлением новых данных
    await Report.deleteMany({});

    // Тестовые данные о ямах
    const reports = [
      {
        userId: "660000000000000000000001", // Укажи ID существующего пользователя
        description: "Глубокая яма возле трассы",
        imageUrl:
          "https://static.mk.ru/upload/entities/2021/04/27/12/articles/facebookPicture/de/ad/4c/27/d460ebc9bfa07d517185eafe61b50ad5.jpg",
        latitude: 54.903056,
        longitude: 52.315556,
        status: "PENDING",
      },
      {
        userId: "660000000000000000000001",
        description: "Опасная яма на выезде из города",
        imageUrl:
          "https://sun9-50.userapi.com/impg/ZiVkzpfXuKCoMp9f3evXzD0_ZcgtJcDizTFTJw/sx67P4J8uOo.jpg?size=1280x851&quality=96&sign=277fc6cdaf8d882305a02d0e9a1a4a7a&c_uniq_tag=mV425QvHYOH1CnQPOidK4ffjobvyzNo245M7RstGivM&type=album",
        latitude: 54.901389,
        longitude: 52.297222,
        status: "IN_PROGRESS",
      },
      {
        userId: "660000000000000000000001",
        description: "Большая яма возле школы",
        imageUrl:
          "https://avatars.mds.yandex.net/i?id=21b089e6fdf4cc303f08eae5d5801484_l-12450907-images-thumbs&n=13",
        latitude: 54.905000,
        longitude: 52.320833,
        status: "COMPLETED",
      },
    ];

    // Добавляем данные в MongoDB
    await Report.insertMany(reports);
    console.log("✅ Тестовые данные успешно добавлены!");

    // Завершаем подключение
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Ошибка при добавлении тестовых данных:", error);
    mongoose.connection.close();
  }
};

// Запускаем функцию
seedReports();