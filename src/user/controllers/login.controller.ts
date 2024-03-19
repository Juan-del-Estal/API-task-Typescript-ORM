import { Request, Response } from "express";

export const loginController = (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'Successful Authentication' });
};

