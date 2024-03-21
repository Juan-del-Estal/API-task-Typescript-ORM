import { Request, Response } from 'express';
import passport from 'passport';

export const extractJWTToken = (req: Request, _res: Response, next:Function) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7); // Eliminar 'Bearer ' del encabezado
    req.token = token; // Guardar el token en el objeto de solicitud para su uso posterior
  }
  next();
};

export const authenticateJWT = passport.authenticate('jwt', { session: false });

export const passportLocal = passport.authenticate('local', { failureRedirect: '/' });