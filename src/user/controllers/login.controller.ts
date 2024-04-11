import { Request, Response } from "express";
import { logger } from '../../utils/logger';

export const loginController = (req: Request | any, res: Response) => {
  console.log('log running..')
  const token = req.user ? req.user.token : null;

  if (!token) {
    logger.error('⚠️⚠️ Token or user not found during authentication. loginController:7 ⚠️⚠️');
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Saving user ID on the session
  req.session.userId = req.user.id
  
  const redirectURL = `user?token=${token}`;
  return res.redirect(redirectURL);
};
