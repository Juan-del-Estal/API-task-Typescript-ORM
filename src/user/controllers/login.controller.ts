import { Request, Response } from "express";
import {logger} from '../../utils/logger'

export const loginController = (req:Request | any, res: Response) => {
  const token = req.user ? req.user.token : null; // Verificamos si req.user está definido
  const user = req.user || null;
  if (!token || !user) {
    logger.error('⚠️⚠️ Token not found on user auth... loginController:7 ⚠️⚠️')
    return res.status(401).json({message:'Invalid credentials'});
  }
  // Redirigir al usuario con el token como parámetro de consulta
  return res.redirect(`user?token=${token}`);
};
