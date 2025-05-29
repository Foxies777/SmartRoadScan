import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log("Received body:", req.body);
  try {
    const { surname, name, patronymic, phone, email, password, login } = req.body;

    const existing = await User.findOne({ $or: [{ email }, { login }] });
    if (existing) {
      console.log(2322);
      
      res.status(400).json({ error: "Пользователь уже существует" });
      return;  // <== остановка выполнения
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      surname,
      name,
      patronymic: patronymic || null,
      phone,
      email,
      login,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "10y" });
    console.log(token);
    
    res.status(201).json({ 
      token, 
      user: {
        id: user._id,
        role: user.role
    }});
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { login, password } = req.body;
    console.log(login, password);
    
    const user = await User.findOne({ login });
    console.log(user);
    
    if (!user) {
      res.status(400).json({ error: "Пользователь не найден" });
      return;  // <== остановка выполнения, чтобы дальше не использовать user
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    
    if (!isMatch) {
      res.status(400).json({ error: "Неверный пароль" });
      return;  // <== тоже нужно прервать
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ 
      token, 
      user: {
        id: user._id,
        role: user.role
    }});
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('Работает!!!!!');
  
  try {
    const userPayload = (req as any).user;
    console.log(userPayload);
    
    if (!userPayload || !userPayload.id) {
      res.status(400).json({ error: "Некорректные данные токена" });
      console.error('Некорректные данные токена"');
      
      return;
    }

    console.log("[getUser] userId:", userPayload.id);

    const user = await User.findById(userPayload.id).select("-password");

    if (!user) {
      res.status(404).json({ error: "Пользователь не найден" });
      return;
    }

    res.status(200).json({
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      phone: user.phone,
      login: user.login,
    });
  } catch (error) {
    console.error("[getUser] Ошибка:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
