import { join } from 'path';
import { DataSource } from 'typeorm';

import logger from './logger';
import config from '@config/default';

// Destructuring Postgres Connection Details
const { host, port, username, password, database } = config.db.pg;
// Create App Data Source From Connection Details 
export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [join(__dirname, '../entities/**/*{.js,.ts}')],
  synchronize: true,
  logging: false,
});

export async function connectPostgresDB(): Promise<void> {
  try {
    await AppDataSource.initialize();
    logger.info(`Database connected to Postgres db (${database}) & host:port (${host}:${port}).`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}
