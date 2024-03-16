import { UpdatePasswordInterface } from "../interfaces/update.user.interface";
import { AppDataSource } from "../../config/data.source";
import { UserEntity } from "../entities/user.entity";
import bcrypt from 'bcrypt';

export const updatePasswordService = async(user:UpdatePasswordInterface) => {
    try { 
    let {username, email, password} = user;
    // Build the WHERE condition dynamically based on provided fields
    let whereCondition = "1=1"; // Always true condition to ensure base query
    if (username) {
      whereCondition += ` AND username = '${username}'`;
    }
    if (email) {
      whereCondition += ` AND email = '${email}'`;
    }
    
    // Hash password
    password = await bcrypt.hash(password,10)
    if(!password) throw new Error ('Error on update service hashing password')
    
    //Query builder
    const updated = await AppDataSource
    .createQueryBuilder()
    .update(UserEntity)
    .set({password : password})
    .where(whereCondition)
    .execute()

    return updated.affected ?? 0;
  }
  catch(err) {
    console.error('Error in updated-password-service', err);
    throw err;
  }
}
