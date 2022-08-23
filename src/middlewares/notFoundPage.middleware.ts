import HttpException from '@utils/HttpException';
import { Request, Response } from 'express';

// Handeling Not Found Page
export default (req: Request, res: Response) => {
  throw new HttpException('Not Found', 404, [
    { message: 'صفحه مورد نظر یافت نشد.', data: null },
  ]);
};
