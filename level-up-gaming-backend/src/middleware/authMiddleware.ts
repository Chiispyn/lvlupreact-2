import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

// -------------------------------------------
// MIDDLEWARE PARA VERIFICAR JWT
// -------------------------------------------
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // No viene header Authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado. Token faltante." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET) as { sub: string; role: string };

    // Guardamos usuario en req.user
    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};

// -------------------------------------------
// MIDDLEWARE PARA RESTRINGIR SOLO ADMIN
// -------------------------------------------
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autorizado." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado. Requiere rol admin." });
  }

  next();
};
