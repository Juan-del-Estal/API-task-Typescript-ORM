import { Request, Response } from "express";

export const loginController = (_req: Request, res: Response) => {
  res.redirect('/api/user')
};

