import { UserEntity } from '../../user/entities/user.entity';
import { logger } from '../../utils/logger';
import { AppDataSource } from '../../config/data.source';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/config';
import bcrypt from 'bcrypt';

const secretJWT:string | null = String(JWT_SECRET)

interface AuthResult {
  user: UserEntity | null;
  token: string | null
};

export const userLogin = async (email: string, password: string): Promise<AuthResult> => {
  try {
    logger.info('=== Searching for user by email and password ===');
    const user = await AppDataSource
      .createQueryBuilder(UserEntity, 'user')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      logger.info('User not found auth.service :15');
      return { user: null, token:null };
    }
    // Compare passwords
    const comparePw = await bcrypt.compare(password, user.password);

    if (!comparePw) {
      return { user: null, token:null };
    }

    // If password matches, generate JWT token
    const token:string = jwt.sign({ userId: user.id }, secretJWT, { expiresIn: '1h' });

    return { user, token };
  } catch (error) {
    console.log('Error auth service:', error);
    return { user: null, token:null};
  }
};
