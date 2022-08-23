import { NextFunction, Request, Response } from 'express';

import userRepository from '@entities/user/user.repository';
import { verifyTokenJwt } from '@utils/jwt.utils';
import {
  IFindUserOption,
  UserPayload,
  UserRole,
} from '@interfaces/user/user.interface';

export default (role?: UserRole) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // Get token from authorization header
    const token = req.headers['authorization']?.split(' ')[1],
      // Check token is Bearer token
      isBearerToken = req.headers['authorization']?.split(' ')[0] === 'Bearer';

    // Check token exists and token type is Bearer
    if (token === undefined || isBearerToken === false) {
      return res.status(401).json({
        code: 401,
        status: 'Unauthorized',
        datails: [{ message: 'ابتدا وارد شوید', date: null }],
      });
    }

    // Decoded token
    const decoded = (await verifyTokenJwt(token)) as UserPayload;

    // Check token is not valid
    if (decoded === null) {
      return res.status(401).json({
        code: 401,
        status: 'Unauthorized',
        datails: [{ message: 'ابتدا وارد شوید', date: null }],
      });
    }

    // Check user role for authorization
    if (!(role ? decoded.role === role : true)) {
      return res
        .status(401)
        .json({ status: 403, message: 'شما اجازه دسترسی ندارید' });
    }

    // Find user by decoded Id
    const findUserOption: IFindUserOption = { where: { id: decoded.id } };
    const user = await userRepository.findUser(findUserOption);

    // Check decoded token equal with user token
    if (user == null || user.token !== token) {
      return res.status(401).json({
        code: 401,
        status: 'Unauthorized',
        datails: [{ message: 'ابتدا وارد شوید', date: null }],
      });
    }

    req.user = decoded;
    next();
  };
