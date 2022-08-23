import { omit, pick } from 'lodash';
import { NextFunction, Request, Response, Router } from 'express';

import config from '@config/default';
import User from '@entities/user/user.entity';
import getUserSchema from '@schemas/user/userId.schema';
import isLogged from '@middlewares/isLogged.middleware';
import rateLimiter from '@middlewares/rateLimiter.middleware';
import updateUserSchema from '@schemas/user/updateUser.schema';
import validateRequest from '@middlewares/validateRequest.middleware';
import { IResponse } from '@interfaces/response.interface';
import { UpdateUserDto } from '@interfaces/user/user.interface';
import { getAllUser, getUser, updateUser } from '@services/user/user.service';
import {
  IGetAllUserQuery,
  IGetUserParam,
  UserRole,
} from '@interfaces/user/user.interface';

// Destructuring rate limiter configs
const { defaultLimitWindow, userAllowedHtis } = config.limiter;

const route = Router();

export default function (app: Router) {
  app.use('/users', route);

  // Get all user route
  route.get(
    '/',
    [rateLimiter(defaultLimitWindow, userAllowedHtis, 'users'), isLogged()],
    async (
      req: Request<{}, {}, {}, IGetAllUserQuery>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const { details } = req.query;

        // Check details query is true or false
        const getDetail = details === 'true' ? true : false;

        // Get user from get all user service
        const users = await getAllUser(getDetail);

        const response: IResponse = {
          code: 200,
          status: 'Ok',
          details: [{ message: 'لیست کاربران', data: users }],
        };
        res.status(response.code).json(response);
      } catch (err) {
        next(err);
      }
    }
  );

  // Get user by Id route
  route.get(
    '/:userId',
    [
      rateLimiter(defaultLimitWindow, userAllowedHtis, 'userInfoById'),
      isLogged(),
      validateRequest(getUserSchema),
    ],
    async (req: Request<IGetUserParam>, res: Response, next: NextFunction) => {
      try {
        const { userId } = req.params;

        // Check user is admin (or super admin)
        const isAdmin =
          req.user!.role === UserRole.ADMIN ||
          req.user!.role === UserRole.SUPER_ADMIN;
        
        // Get user from get user service
        const user = await getUser(userId!, isAdmin);

        const response: IResponse = {
          code: 200,
          status: 'Ok',
          details: [{ message: 'کاربر مورد نظر یافت شد', data: user }],
        };
        res.status(response.code).json(response);
      } catch (err) {
        next(err);
      }
    }
  );

  // Update user profile route
  route.put(
    '/updateprofile',
    [
      rateLimiter(defaultLimitWindow, userAllowedHtis, 'updateUserByToken'),
      isLogged(),
      validateRequest(pick(updateUserSchema, ['body'])),
    ],
    async (
      req: Request<{}, {}, UpdateUserDto>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const { id } = req.user!;
        const updateData = req.body;

        // Get new token from update user service after update user
        const { token } = (await updateUser(id, updateData)) as User;

        const response: IResponse = {
          code: 200,
          status: 'Ok',
          details: [{ message: 'اطلاعات با موفقیت بروزرسانی شد', data: token }],
        };
        res.status(response.code).json(response);
      } catch (err) {
        next(err);
      }
    }
  );

  // Update user profile by Id route
  route.put(
    '/updateprofile/:userId',
    [
      rateLimiter(defaultLimitWindow, userAllowedHtis, 'updateUserById'),
      isLogged(),
      validateRequest(updateUserSchema),
    ],
    async (
      req: Request<IGetUserParam, {}, UpdateUserDto>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const { userId } = req.params;
        const updateData = req.body;

        // Get user from update user service
        const updatedUser = await updateUser(userId!, updateData);

        // Omit password and temppassword from user object
        const user = omit(updatedUser, ['password', 'tempPassword']);

        const response: IResponse = {
          code: 200,
          status: 'Ok',
          details: [{ message: 'اطلاعات با موفقیت بروزرسانی شد', data: user }],
        };
        res.status(response.code).json(response);
      } catch (err) {
        next(err);
      }
    }
  );
}
