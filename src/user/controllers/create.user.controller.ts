import { createUserService } from "../services/create.user.service";
import { Request, Response } from 'express';

interface UploadedFile {
  filename: string;
  // Add any other properties of the uploaded file that you need to access
}

// Update the controller to use the UploadedFile interface
export const createUserController = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Empty object' });
    }
    // Extract the user data from the request body
    const user = req.body;
    
    // Extract the filename of the uploaded file from the request object
    const uploadedFile = req.file as UploadedFile;
    const photo = uploadedFile.filename

    // Call the createUserService function with the user data and filename
    const message = await createUserService(user, photo);

    // Return a success response with the message
    return res.status(200).json(message);
  }
  catch(err) {
    // Handle any errors that occur during user creation
    console.error(`An error occurred during user creation: ${err}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
