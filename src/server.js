import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.js';
import { notFoundMiddleware } from './middlewares/notFound.js';
import router from './routers/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = env(ENV_VARS.PORT, 3000);

export const startServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use(cookieParser());

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Home page',
    });
  });

  app.use(router);

  app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
