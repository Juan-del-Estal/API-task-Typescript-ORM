import { Request, Response } from "express"

export const userHomeController = (_req: Request, res: Response) => {
  res.status(200).render('user.pug')
}

export const indexPageController = (_req: Request, res: Response) => {
  res.status(200).render('index.pug')
}