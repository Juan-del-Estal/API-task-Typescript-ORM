import { Request, Response } from "express";

export const userHomeController = (req: any, res: Response) => {
  // Passing username and url-profile-photo to the view
  const profilePhoto = req.user.profilePhoto.trim();
  const username = req.user.username;
  const name = `${req.user.name} ${req.user.lastname}`
 
  res.status(200).render('user.pug', { profilePhoto, username, name });
};

export const indexPageController = (_req: Request, res: Response) => {
  res.status(200).render('index.pug');
};