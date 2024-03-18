import { UserEntity } from '../../user/entities/user.entity';
import { logger } from '../../utils/logger';
import { AppDataSource } from '../../config/data.source';

export const findById = async (userId: number): Promise<UserEntity | null> => {
  try {
    logger.info('Searching for user by ID..');
    const user = await AppDataSource
      .createQueryBuilder(UserEntity, 'user')
      .where('user.id = :id', { id: userId })
      .getOne();

    return user || null;
  } catch (error) {
    console.log('Error while searching for user by ID:', error);
    return null;
  }
};
