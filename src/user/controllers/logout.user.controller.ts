import { Request, Response } from 'express';

export const logOutUserController = (req: Request, res: Response, next: Function) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect(`/`);  
})};
