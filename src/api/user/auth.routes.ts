import { NextFunction, Request, Response, Router } from 'express';

import { signInUser, signUpUser } from '@services/user/auth.service';
import { omit } from 'lodash';
import { SignInUserDto, SignUpUserDto } from '@interfaces/user/user.interface';
import validateRequest from '@middlewares/validateRequest.middleware';
import signUpSchema from '@schemas/auth/signUp.schema';
import signInSchema from '@schemas/auth/signIn.shema';
import rateLimiter from '@middlewares/rateLimiter.middleware';
import config from '@config/default';
import { IResponse } from '@interfaces/response.interface';

// Destructuring limiter configs
const { defaultLimitWindow, authLimitAllowedHtis } = config.limiter;

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  // User signup route
  route.post(
    '/signup',
    [
      rateLimiter(defaultLimitWindow, authLimitAllowedHtis, 'signup'),
      validateRequest(signUpSchema),
    ],
    async (
      req: Request<{}, {}, SignUpUserDto>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const userData = omit(req.body, 'confirmPassword');

        // Create user from sign up service
        await signUpUser(userData);

        const response: IResponse = {
          code: 201,
          status: 'Created',
          details: [{ message: 'ثبت نام با موفقیت انجام شد', data: null }],
        };
        res.status(response.code).json(response);
      } catch (err) {
        next(err);
      }
    }
  );

  // User sigin route
  route.post(
    '/signin',
    [
      rateLimiter(defaultLimitWindow, authLimitAllowedHtis, 'signin'),
      validateRequest(signInSchema),
    ],
    async (
      req: Request<{}, {}, SignInUserDto>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const userData = req.body;

        // Generate new token for login user from sign in service
        const token = await signInUser(userData);

        const response: IResponse = {
          code: 200,
          status: 'Ok',
          details: [{ message: 'ورود با موفقیت انجام شد', data: token }],
        };
        res.status(response.code).json(response);
      } catch (err: any) {
        next(err);
      }
    }
  );
};
