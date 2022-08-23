import { signUpPath, signInPath } from './auth.paths';
import {
  getUsersPath,
  getUserByIdPath,
  updateUserPath,
} from './user.paths';

export default {
  // auth paths
  '/auth/signup': signUpPath,
  '/auth/signin': signInPath,

  // user paths
  '/users/': getUsersPath,
  '/users/{userId}': getUserByIdPath,
  '/users/updateprofile': updateUserPath,
};
