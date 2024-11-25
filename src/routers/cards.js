import { Router } from 'express';
import {
  createCardController,
  deleteCardByIdController,
  getAllCardsController,
  getCardByIdController,
  patchCardController,
  putCardController,
} from '../controllers/cards.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';

const cardsRouter = Router();

cardsRouter.post('/', controllerWrapper(createCardController));
cardsRouter.patch('/:cardId', controllerWrapper(patchCardController));
cardsRouter.put('/:cardId', controllerWrapper(putCardController));
cardsRouter.get('/', controllerWrapper(getAllCardsController));
cardsRouter.get('/:cardId', controllerWrapper(getCardByIdController));
cardsRouter.delete('/:cardId', controllerWrapper(deleteCardByIdController));

export default cardsRouter;
