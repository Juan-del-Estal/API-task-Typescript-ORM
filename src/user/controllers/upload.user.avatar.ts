import { RequestHandler, Request, Response, NextFunction} from 'express';
import { upload } from '../../utils/multer';

export const uploadProfilePhoto: RequestHandler = (req:Request, res:Response, next:NextFunction) => {
  upload.single('userPhoto')(req, res, (err: any) => {
    if (err) {
    console.error('Error uploading avatar:', err);
    return res.status(400).json({ message: 'Error uploading avatar', error: err.message });
    }
    return next();
  });
};

export const uploadPostPhoto: RequestHandler = (req:Request, res:Response, next:NextFunction) => {
  upload.single('postPhoto')(req, res, (err: any) => {
    if (err) {
    console.error('Error uploading avatar:', err);
    return res.status(400).json({ message: 'Error uploading avatar', error: err.message });
    }
    res.status(200).json({message:'Post photo uploaded successfully'})
    return next();
  });
};
