import { RequestHandler, Request, Response, NextFunction} from 'express';
import { upload } from '../../utils/multer';

export const uploadPhoto: RequestHandler = (req:Request, res:Response, next:NextFunction) => {
  upload.single('userPhoto')(req, res, (err: any) => {
    if (err) {
    console.error('Error uploading avatar:', err);
    return res.status(400).json({ message: 'Error uploading avatar', error: err.message });
    }
    
    return next();
  });
}
