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
import { validateMongoIdParam } from '../middlewares/validateMongoIdParam.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createCardValidationSchema } from '../validation/createCardValidationSchema.js';
import { updateCardValidationSchema } from '../validation/updateCardValidationSchema.js';
import { authenticate } from '../middlewares/authenticate.js';

const cardsRouter = Router();

cardsRouter.use('/', authenticate);

cardsRouter.use('/:cardId', validateMongoIdParam('cardId'));

cardsRouter.post(
  '/',
  validateBody(createCardValidationSchema),
  controllerWrapper(createCardController),
);
cardsRouter.patch(
  '/:cardId',
  validateBody(updateCardValidationSchema),
  controllerWrapper(patchCardController),
);
cardsRouter.put(
  '/:cardId',
  validateBody(createCardValidationSchema),
  controllerWrapper(putCardController),
);
cardsRouter.get('/', controllerWrapper(getAllCardsController));
cardsRouter.get('/:cardId', controllerWrapper(getCardByIdController));
cardsRouter.delete('/:cardId', controllerWrapper(deleteCardByIdController));

export default cardsRouter;
