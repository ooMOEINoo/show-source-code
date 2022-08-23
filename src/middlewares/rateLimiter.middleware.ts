import { NextFunction, Request, Response } from 'express';

import client from '@utils/connectRedisDB';

// Rate limiter for request
export default (
    secondsWindow: number = 60,
    allowedHits: number = 10,
    api: string = ''
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // Get user IP from request
    const ip = req.socket.remoteAddress || req.ip;

    // Set count request in redis db
    let ttl: number;
    const countRequest = await client.incr(`${ip}_${api}`);

    // Set expire for first count request
    if (countRequest === 1) {
      await client.expire(`${ip}_${api}`, secondsWindow);
      ttl = secondsWindow;
    } else {
      ttl = await client.ttl(`${ip}_${api}`);
    }

    // Check conut request is more than allowed hits => reqest return
    if (countRequest >= allowedHits) {
      return res.status(429).json({
        status: 429,
        message: 'To Many Request',
        details: [{ message: 'درخواست بیش از حد مجاز', data: null }],
      });
    }

    next();
  };
