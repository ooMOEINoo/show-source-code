import './path';
import { createServer } from 'http';

import app from './app';
import logger from '@utils/logger';
import config from '@config/default';
import { connectPostgresDB } from '@utils/connectPostgresDB';
import { connectRedisDB } from '@utils/connectRedisDB';

const server = createServer(app);
const PORT = config.app.port;

// bootstartp server
(async () => {
  // log app mode
  logger.info(`App Mode: (${process.env.NODE_ENV}).`);

  // connect to postgres db
  await connectPostgresDB();
  // connect to redis db
  await connectRedisDB();
  
  // listening server on favorite port
  server.listen(PORT, () =>
    logger.info(`Server is running on PORT: (${PORT}).`)
  );
})();
