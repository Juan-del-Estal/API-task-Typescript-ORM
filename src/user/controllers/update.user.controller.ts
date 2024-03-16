import { Request, Response } from "express"
import { updatePasswordService } from "../services/update.user.service";

export const updatePasswordController = async(req:Request,res:Response) => {
  try {
  const {username, email, password, confirmPw} = req.body;

  if(!username || !email || !password || !confirmPw) {
    return res.status(400).json({message:`Are fields are required`})
  }
  if(password !== confirmPw) {
    return res.status(400).json({message: `Passwords don´t match`})
  }

  const recordsAffected = await updatePasswordService(req.body)
  if(recordsAffected === 0){
    return res.status(404).json({message: 'Credentials don´t match with our database'})
  }

  return res.status(200).json({message:`User password updated succesfully`})
}
catch(err) {
  console.error('Error in user-update-controller', err);
  return res.status(500).json({message:'Internal server error'})
}
}