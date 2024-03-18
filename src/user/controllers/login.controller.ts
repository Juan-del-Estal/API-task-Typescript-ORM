import passport from "passport";
import { Request, Response } from "express";

// This middleware handles the authentication using Passport's local strategy
export const authenticateLogin = passport.authenticate('local', {
  failureRedirect : '/login'
});

export const loginController = (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'Successful Authentication' });
};

