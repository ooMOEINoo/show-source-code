import { Error, ApiResponse } from './default.schemas';
import { user } from './auth.schemas';
import { userSchema, updateUserProfRequestBodiesSchema } from './user.schemas';
import { createCategoryRequestBodiesSchema } from './categorySchemas';

export default {
  // default schemas
  'Api Response': ApiResponse,
  // Error,

  // auth schemas
  // signUpRequestBodiesSchema,
  // signInRequestBodiesSchema,

  // user schemas
  User: user,

  // category schemas
  // createCategoryRequestBodiesSchema,
};
