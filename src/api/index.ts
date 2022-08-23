import { Router } from 'express';

import authRoutes from './user/auth.routes';
import userRoutes from './user/user.routes';

// router
export default () => {
  const router = Router();

  // user routes
  authRoutes(router);
  userRoutes(router);

  return router;
};
