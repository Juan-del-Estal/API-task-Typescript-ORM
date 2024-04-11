import { Router } from "express";
import { createUserController } from "../../user/controllers/create.user.controller";
import { deleteUserController } from "../../user/controllers/delete.user.controllers";
import { updatePasswordController } from "../../user/controllers/update.user.controller";
import { loginController } from "../../user/controllers/login.controller";
import { logOutUserController } from "../../user/controllers/logout.user.controller";
import { authenticateJWT, passportLocal } from "../../auth/middlewares/auth.middleware";
import { uploadAvatar }  from "../../user/controllers/upload.user.avatar";
import { userHomeController, indexPageController } from "../../user/controllers/home.user.controller";

export class UserRoute {
  public path = '/';
  public router = Router();

  constructor() {
    this.initUserRoutes()
  }

  public initUserRoutes() {
    this.router.get(`${this.path}`, indexPageController);
    this.router.get(`${this.path}user`, authenticateJWT, userHomeController);
    this.router.get(`${this.path}user/log-out`, logOutUserController);
    this.router.post(`${this.path}login-user`, passportLocal, loginController);
    this.router.post(`${this.path}create-user`, uploadAvatar, createUserController);
    this.router.delete(`${this.path}delete-user`, deleteUserController);
    this.router.put(`${this.path}update-user`, updatePasswordController);
  }
};