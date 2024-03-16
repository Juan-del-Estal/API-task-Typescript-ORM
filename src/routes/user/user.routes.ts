import { Router,Request,Response } from "express";
import { createUserController } from "../../user/controllers/create.user.controller";
import { deleteUserController } from "../../user/controllers/delete.user.controllers";
import { updatePasswordController } from "../../user/controllers/update.user.controller";


export class UserRoute {
  public path ='/';
  public router = Router();

  constructor() {
    this.initUserRoutes()
  }

  public initUserRoutes() {
    this.router.get(`${this.path}`, (_req:Request,res:Response) => {
      res.status(200).render('index.pug')
    });
    this.router.post(`${this.path}login-user`);
    this.router.post(`${this.path}create-user`, createUserController);
    this.router.delete(`${this.path}delete-user`, deleteUserController);
    this.router.put(`${this.path}update-user`, updatePasswordController)
  }
  }