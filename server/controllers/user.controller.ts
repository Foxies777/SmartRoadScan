import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret";


export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });
    res.status(201).json(user);
  } catch (error) {
    next(error); 
  }
};


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
  
      
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ error: "Пользователь не найден" });
        return; 
      }
  
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ error: "Неверный пароль" });
        return; 
      }
  
      
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
  
      
      res.json({ token, user });
    } catch (error) {
      next(error); 
    }
  };