import { createClient } from 'redis';

import logger from './logger';
import config from '@config/default';

// Destructuring Redis Connection Details
const { host, port } = config.db.redis;
// Create Client Redis From Connection Details
const client = createClient({
  socket: { host, port },
});

export async function connectRedisDB() {
  try {
    await client.connect();
    logger.info(`Redis database connected to host:port (${host}:${port}).`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

export default client;
