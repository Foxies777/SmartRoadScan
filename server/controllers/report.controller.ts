import { Request, Response } from "express";
import { User } from "../models/User";
import { Report } from "../models/Report";


export const getReports = async (req: Request, res: Response) => {
  try {
    console.log('Пришло запрос на получение отчетов');
    
    const reports = await Report.find();
    console.log(reports);
    
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения отчетов" });
  }
};


export const createReport = async (req: Request, res: Response) => {
    try {
      const { userId, description, imageUrl, latitude, longitude } = req.body;
  
      
      const user = await User.findById(userId);
      if (!user) {
        res.status(400).json({ error: "Пользователь не найден" });
        return; 
      }
  
      
      const report = await Report.create({ userId, description, imageUrl, latitude, longitude });
      res.status(201).json(report); 
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: "Ошибка создания отчета" }); 
    }
  };