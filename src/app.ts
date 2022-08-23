import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { join } from 'path';
import express, { Express } from 'express';

import swaggerDocument from './docs/swagger';
import api from '@api/index';
import config from '@config/default';
import checkHealth from '@middlewares/checkHealth.middleware';
import errorHandler from '@middlewares/errorHandler.middleware';
import notFoundPage from '@middlewares/notFoundPage.middleware';

const app: Express = express();

// Set static folder
app.use(express.static(join(__dirname, 'public')));

// Set middlewares
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Check health endpoint
app.get('/health', checkHealth);
// Api
const { prefixApi } = config.app;
app.use(prefixApi, api());
// Not Found route
app.use(notFoundPage);
// Error Handler
app.use(errorHandler);

export default app;
