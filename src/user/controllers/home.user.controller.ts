import { Request, Response } from "express";

export const userHomeController = (req: any, res: Response) => {
  const profilePhoto = req.user.profilePhoto.trim();
  res.status(200).render('user.pug', { profilePhoto });
};

export const indexPageController = (_req: Request, res: Response) => {
  res.status(200).render('index.pug');
};