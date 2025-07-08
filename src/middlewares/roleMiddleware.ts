import { Request, Response, NextFunction } from 'express';

export function roleMiddleware(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const perfil = req.user?.perfil;

    if (!perfil || !roles.includes(perfil)) {
      res.status(403).json({ message: 'Acesso negado' });
      return;
    }

    next();
  };
}
