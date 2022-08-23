import { pick } from 'lodash';

import config from '@config/default';
import whiteList from '@utils/whiteObject';
import HttpException from '@utils/HttpException';
import userRepository from '@entities/user/user.repository';
import { signPayloadJwt } from '@utils/jwt.utils';
import {
  IFindUserOption,
  IFindUsersOption,
  UpdateUserDto,
} from '@interfaces/user/user.interface';

// Get all user service
export async function getAllUser(getDetail: boolean) {
  try {
    // Find users
    const findUsersOption: IFindUsersOption = {
      select: {
        id: true,
        fullname: true,
        email: true && getDetail,
        phone: true && getDetail,
        role: true && getDetail,
      },
    };
    const users = await userRepository.findUsers(findUsersOption);

    return users;
  } catch (err) {
    throw err;
  }
}

// Get one user by Id servie
export async function getUser(userId: string, isAdmin: boolean = false) {
  try {
    // Find user by Id
    const findUserOption: IFindUserOption = {
      where: { id: userId },
      select: {
        id: true,
        fullname: true,
        role: true,
        email: true && isAdmin,
        phone: true && isAdmin,
        token: true && isAdmin,
        createdAt: true && isAdmin,
        updatedAt: true && isAdmin,
      },
    };
    const user = await userRepository.findUser(findUserOption);

    // Check find user by this userId
    if (user === null) {
      throw new HttpException('not found', 404, [
        { message: 'کاربر مورد نظر یافت نشد', data: null },
      ]);
    }

    return user;
  } catch (err) {
    throw err;
  }
}

// Update user by Id service
export async function updateUser(userId: string, updateData: UpdateUserDto) {
  try {
    // Remove null or undefined keys from updateData object
    updateData = await whiteList<UpdateUserDto>(updateData);

    // Update user by update data
    const updateSuccess = await userRepository.updateUser(userId, updateData);

    // Check update success
    if (updateSuccess === false) {
      throw new HttpException('Expectation Failed', 417, [
        { message: 'بروزرسانی اطلاعات ناموفق بود', data: null },
      ]);
    }

    // Find user by Id
    const findUserOption: IFindUserOption = { where: { id: userId } };
    const user = await userRepository.findUser(findUserOption);

    // Pick userPayload from user
    const userPayload = pick(user, [
      'id',
      'fullname',
      'email',
      'phone',
      'role',
    ]);

    // Generate token
    const expiresIn = config.app.jwt.expires;
    const token = await signPayloadJwt(userPayload, { expiresIn });

    // Save user token
    user!.token = token;
    await user!.save();

    return user;
  } catch (err) {
    throw err;
  }
}
