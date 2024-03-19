import { UserEntity } from '../../user/entities/user.entity';
import { logger } from '../../utils/logger';
import { AppDataSource } from '../../config/data.source';
import bcrypt from 'bcrypt';

export const userLogin = async (email:string, password:string): Promise<UserEntity | null> => {
  try {
    logger.info('=== Searching for user by email and password ===');
    const user = await AppDataSource
      .createQueryBuilder(UserEntity, 'user')
      .where('user.email = :email', { email })
      .getOne();

    if(!user) {
      logger.info('User not found auth.service :15') 
      return null;
    }
    logger.info(`User : ${user.password}`)
    logger.info('Password hash : ' + user.password)
    // Compare paswwords
    const comparePw = await bcrypt.compare(password, user.password);

    if(!comparePw) return null;

    else return user;

  } catch (error) {
    console.log('Error auth service:', error);
    return null;
  }
};
