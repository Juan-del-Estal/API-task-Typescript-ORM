import passport from "passport";
import { Router, Request, Response } from "express";
import { createUserController } from "../../user/controllers/create.user.controller";
import { deleteUserController } from "../../user/controllers/delete.user.controllers";
import { updatePasswordController } from "../../user/controllers/update.user.controller";
import { loginController } from "../../user/controllers/login.controller";
import { logOutUserController } from "../../user/controllers/logout.user.controller";


export class UserRoute {
  public path = '/';
  public router = Router();

  constructor() {
    this.initUserRoutes()
  }

  public initUserRoutes() {
    this.router.get(`${this.path}`, (_req: Request, res: Response) => {
      res.status(200).render('index.pug')
    });
    this.router.get(`${this.path}user`, (_req: Request, res: Response) => {
      res.status(200).render('user.pug')
    })
    this.router.get(`${this.path}user/log-out`, logOutUserController);
    this.router.post(`${this.path}login-user`, passport.authenticate('local', { failureRedirect: '/' }), loginController);
    this.router.post(`${this.path}create-user`, createUserController);
    this.router.delete(`${this.path}delete-user`, deleteUserController);
    this.router.put(`${this.path}update-user`, updatePasswordController);
  }
}