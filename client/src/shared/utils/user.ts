import { setUser } from '@entities/user/model';
import { jwtDecode } from 'jwt-decode';

export type JwtPayload = {
  userId: string;
  role: string; // предполагаем, что в токене есть роль
};

export const getUser = (): JwtPayload | null => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }
  return null;
};

export const initUserFromToken = () => {
    const decoded = getUser();
    if (decoded) {
      setUser({
        id: decoded.userId,
        role: decoded.role,
      });
    }
  };