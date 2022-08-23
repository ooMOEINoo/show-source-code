import Validator from 'fastest-validator';
import { NextFunction, Request, Response } from 'express';

import HttpException from '@utils/HttpException';

const v = new Validator();
// Function ralidation request
export default (schema: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    const check = v.compile(schema);
    const valid = check({
      body: req.body,
      query: req.query,
      params: req.params,
      headers: req.headers,
    });

    if (valid !== true) {
      throw new HttpException('Bad Request', 400, valid as []);
    }

    next();
  };
