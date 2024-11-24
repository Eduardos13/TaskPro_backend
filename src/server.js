import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import errorHandlerMiddleware from './middlewares/errorHandler.js';
import notFoundMiddleware from './middlewares/notFound.js';
import { getAllCards, getCardById } from './services/cards.js';

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

  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      message: 'Home page',
    });
  });

  app.get('/cards', async (req, res) => {
    const cards = await getAllCards();

    res.status(200).json({
      cards,
    });
  });

  app.get('/cards/:cardId', async (req, res) => {
    const { cardId } = req.params;
    const card = await getCardById(cardId);

    res.status(200).json({
      card,
    });
  });

  app.use('*', notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
