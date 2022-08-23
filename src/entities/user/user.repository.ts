import User from '@entities/user/user.entity';
import HttpException from '@utils/HttpException';
import { AppDataSource } from '@utils/connectPostgresDB';
import {
  IFindUserOption,
  IFindUsersOption,
  SignUpUserDto,
  UpdateUserDto,
} from '@interfaces/user/user.interface';

// Get user repository from App Data Source
const userRepository = AppDataSource.getRepository(User);

class UserRepository {
  public createUser = async (userData: SignUpUserDto) => {
    const user = userRepository.create(userData);
    await user.save();
    return user;
  };

  public findUsers = async (findQuery: IFindUsersOption) => {
    return userRepository.find(findQuery);
  };

  public findUser = async (findQuery: IFindUserOption) => {
    return userRepository.findOne(findQuery);
  };

  public updateUser = async (userId: string, updateData: UpdateUserDto) => {
    try {
      const updateResult = await userRepository.update(userId, updateData);
      // Check user update successful
      if (updateResult.affected === 1) {
        return true;
      } else {
        return false;
      }
    } catch (err: any) {
      // Check email or phone number already exists
      if (err?.code == 23505) {
        if (err.detail.includes('email'))
          throw new HttpException('duplicate', 409, [
            {
              message: 'ایمیل وارد شده توسط کاربر دیگری انتخاب شده است',
              data: null,
            },
          ]);
        else
          throw new HttpException('duplicate', 409, [
            {
              message: 'شماره همراه وارد شده توسط کاربر دیگری انتخاب شده است',
              data: null,
            },
          ]);
      }
      throw err;
    }
  };
}

export default new UserRepository();
