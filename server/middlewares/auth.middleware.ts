import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    
    if (!token) {
        res.status(401).json({ error: "Нет доступа" });
        return; 
    }

    try {
        
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded; 
        next(); 
    } catch (error) {
        
        res.status(401).json({ error: "Неверный токен" });
        next(error); 
    }
};