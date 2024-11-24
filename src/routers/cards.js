import { Router } from 'express';
import {
  getAllCardsController,
  getCardByIdController,
} from '../controllers/cards.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';

const cardsRouter = Router();

cardsRouter.get('/', controllerWrapper(getAllCardsController));

cardsRouter.get('/:cardId', controllerWrapper(getCardByIdController));

export default cardsRouter;
