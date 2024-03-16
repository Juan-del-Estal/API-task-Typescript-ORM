import { deleteUserService } from "../services/delete.user.service";
import { Request, Response } from "express";

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const {username, email, password, confirmPw} = req.body;
    // Handling empty fields
    if (!username || !email || !password || !confirmPw) {
      return res.status(400).json({ message: `All fields are required` });
    }
    // Handling passwords match
    if(password !== confirmPw) {
      return res.status(400).json({ message: `Passwords don´t match` });
    }
    
    const result = await deleteUserService(req.body);
    if (result === 0) {
      return res.status(404).json({ message: `Invalid credentials` });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(`Error deleting user: ${err}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
