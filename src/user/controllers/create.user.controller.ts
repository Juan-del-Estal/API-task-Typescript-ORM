import { createUserService } from "../services/create.user.service";
import { Request, Response } from 'express';

export const createUserController = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Empty object' })
    }

    const user = req.body
    const message  = await createUserService(user);

    return res.status(200).json(message)
  }
  catch(err) {
    console.error(`An error was occured during user creation ${err} `)
    return res.status(500).json({ message: 'Internal server error' });
  }
}; 
