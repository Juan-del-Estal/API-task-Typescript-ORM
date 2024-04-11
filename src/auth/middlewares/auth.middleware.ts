import { Request, Response } from 'express';
import passport from 'passport';

export const extractJWTToken = (req: Request | any, _res: Response, next: Function) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer') ? authHeader.substring(7) : req.query.token;
  if (token) {
    req.token = token;
  }
  next();
};

export const authenticateJWT = (req: Request, res: Response, next: Function) => {
  const token = req.headers.authorization?.split(' ')[1] || req.query.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
};

export const passportLocal = passport.authenticate('local', { failureRedirect: '/api' })