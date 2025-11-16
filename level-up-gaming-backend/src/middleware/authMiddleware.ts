import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-secret';

export interface AuthRequest extends Request {
  user?: { id: string; role?: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization as string | undefined;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado: token faltante' });
  }

  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, SECRET) as any;
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

export function isAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso prohibido: se requiere rol admin' });
  }
  next();
}
