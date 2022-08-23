import { NextFunction, Request, Response } from 'express';

import logger from '@utils/logger';
import HttpException from '@utils/HttpException';
import { IResponse } from '@interfaces/response.interface';

export default (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: IResponse;
  // Check is server error or http exception
  if (!err.statusCode) {
    error = {
      code: 500,
      status: 'server error',
      details: [{ message: 'خطایی سمت سرور رخ داده است', data: null }],
    };
    logger.error(err.message);
  } else {
    error = {
      code: err.statusCode,
      status: err.message,
      details: err.details,
    };
  }

  res.status(error.code).json(error);
};
