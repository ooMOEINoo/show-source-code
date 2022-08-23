import { pick } from 'lodash';

import config from '@config/default';
import HttpException from '@utils/HttpException';
import userRepository from '@entities/user/user.repository';
import { signPayloadJwt } from '@utils/jwt.utils';
import { comparePassword } from '@utils/bcrypt.utils';
import {
  IFindUserOption,
  SignInUserDto,
  SignUpUserDto,
} from '@interfaces/user/user.interface';

// SignUp user service
export async function signUpUser(userData: SignUpUserDto): Promise<void> {
  try {
    // Destructuring user data
    const { email, phone } = userData;

    // Find user by Email or Phone Number
    const findUserOption: IFindUserOption = { where: [{ email }, { phone }] };
    const userExists = await userRepository.findUser(findUserOption);

    // Checking that a user is already registered by this Email or Phone Number
    if (userExists) {
      if (userExists.email === email) {
        throw new HttpException('duplicate', 409, [
          {
            message: 'کاربری با این ایمیل ثبت شده است',
          },
        ]);
      } else {
        throw new HttpException('duplicate', 409, [
          {
            message: 'کاربری با این شماره همراه ثبت شده است',
          },
        ]);
      }
    } else {
      // Create new user from user data
      await userRepository.createUser(userData);
    }
  } catch (err) {
    throw err;
  }
}

// SignIn user service
export async function signInUser(userData: SignInUserDto) {
  try {
    // Destructuring user data
    const { email, password } = userData;

    // Find user by Email
    const findUserOption: IFindUserOption = { where: { email } };
    const userExists = await userRepository.findUser(findUserOption);

    // Checking already exists User By this email
    if (userExists === null) {
      throw new HttpException('Not Found', 404, [
        {
          message: 'کاربری با این ایمیل یافت نشد',
        },
      ]);
    }

    // Compare user data password by user db password
    const userPassword = userExists.password;
    const passwordIsCorrect = await comparePassword(password, userPassword);
    if (passwordIsCorrect === false) {
      throw new HttpException('Forbidden', 403, [
        {
          message: 'رمز عبور صحیح نمی باشد',
        },
      ]);
    }

    // Generate token
    const userPayload = pick(userExists, [
      'id',
      'fullname',
      'email',
      'phone',
      'role',
    ]);
    const expiresIn = config.app.jwt.expires;
    const token = await signPayloadJwt(userPayload, { expiresIn });

    // Save user token
    userExists.token = token;
    await userExists.save();

    return token;
  } catch (err) {
    throw err;
  }
}
