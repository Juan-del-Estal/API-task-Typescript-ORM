import { UserEntity } from "../entities/user.entity";
import { AppDataSource } from "../../config/data.source";
import { DeleteUserInterface } from "../interfaces/delete.user.interface";
import bcrypt from 'bcrypt';

export const deleteUserService = async (user: DeleteUserInterface): Promise<number> => {
  try {
    const { username, password, email } = user;

    // Hash the password before using it in the query
    const hashedPassword = await bcrypt.hash(password, 10);

    // Build the WHERE condition dynamically based on provided fields
    let whereCondition = "1=1"; // Always true condition to ensure base query
    if (username) {
      whereCondition += ` AND username = '${username}'`;
    }
    if (password) {
      whereCondition += ` AND password = '${hashedPassword}'`; // Use the hashed password
    }
    if (email) {
      whereCondition += ` AND email = '${email}'`;
    }

    // Execute the delete query with the constructed WHERE condition
    const result = await AppDataSource
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where(whereCondition) // Add the dynamically constructed WHERE condition
      .execute();

    // affected is the number of register matching with the query
    return result.affected ?? 0; // Return the number of affected rows or 0 if not available
  }
  catch(err) {
    console.error('An error occurred', err);
    throw err;
  }
};
