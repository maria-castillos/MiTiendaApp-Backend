import { verifyToken } from '../services/authService.js';

export const authMiddleware = (req, res, next) => {

  const token = req.headers.authorization?.split(' ')[1];


  if (!token) return res.status(401).json({ message: 'Token requerido' });

  const decoded = verifyToken(token);


  if (!decoded) return res.status(401).json({ message: 'Token inválido o expirado' });

  req.user = decoded;
  next();
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso solo para administradores' });
  }
  next();
};
