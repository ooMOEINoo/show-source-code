import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';

import limiterConfig from './limiter.conf';

// Check node environment
if (process.env.NODE_ENV === 'development') {
  // Set env path
  const pathDevEnv = resolve(__dirname, '../../.env.dev');
  config({ path: pathDevEnv });
} else {
  // Set env path
  const pathProdEnv = resolve(__dirname, '../../.env.prod');
  config({ path: pathProdEnv });
}

// Read private and public keys from key files
const jwtPrivateSecret =
  readFileSync(join(__dirname, '../../private.key'), {
    encoding: 'utf-8',
  }) || 'private';
const jwtPublicSecret =
  readFileSync(join(__dirname, '../../public.key'), {
    encoding: 'utf-8',
  }) || 'public';

// Export config object
export default {
  // Application configs
  app: {
    port: process.env.PORT || 3000,
    prefixApi: process.env.PREFIX_API || '/v1/api',
    jwt: {
      jwtPrivateSecret,
      jwtPublicSecret,
      expires: Number(process.env.JWT_EXPIRES) || 6000,
    },
    bcrypt: {
      genSalt: Number(process.env.GEN_SALT) || 10,
    },
  },

  // Data base configs
  db: {
    pg: {
      host: process.env.POSTGRES_HOST || '127.0.0.1',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'talkent',
    },
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  },

  // Rate limiter configs
  limiter: limiterConfig,
};
