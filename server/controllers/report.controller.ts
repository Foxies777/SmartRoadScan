import { Request, Response } from "express";
import { User } from "../models/User";
import { Report } from "../models/Report";


export const getReports = async (req: Request, res: Response) => {
  try {
    console.log('Пришло запрос на получение отчетов');
    
    const reports = (await Report.find()).reverse();
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


export const getFilteredReports = async (req: Request, res: Response) => {
  console.log('работает1');
  try {
    const { type, status, minArea, maxArea, from, to } = req.query;
    const query: any = {};
    console.log('работает2');
    console.log( type, status, minArea, maxArea, from, to);
    
    if (type) query.type = type;

    if (status) {
      if (Array.isArray(status)) {
        query.status = { $in: status };
      } else {
        query.status = status;
      }
    }

    if (type === 'offline') {
      query.area = {};
      if (minArea) query.area.$gte = parseFloat(minArea as string);
      if (maxArea) query.area.$lte = parseFloat(maxArea as string);
      if (Object.keys(query.area).length === 0) delete query.area;
    }

    if (from || to) {
      query.timestamp = {};
      if (from) query.timestamp.$gte = new Date(from as string);
      if (to) query.timestamp.$lte = new Date(to as string);
      if (Object.keys(query.timestamp).length === 0) delete query.timestamp;
    }
    console.log(query);
    
    const reports = await Report.find(query).sort({ timestamp: -1 });
    // console.log(reports)
    res.status(200).json(reports);
  } catch (error) {
    console.error('❌ Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};
