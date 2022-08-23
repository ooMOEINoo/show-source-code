import { UserPayload } from '@interfaces/user/user.interface';
import express from 'express';

declare module 'express' {
  interface Request {
    user?: UserPayload;
  }
}
