import { Router } from 'express';
import { validateMongoIdParam } from '../middlewares/validateMongoIdParam.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import {
  createBoardController,
  deleteBoardByIdController,
  getAllBoardsController,
  getBoardByIdController,
  updateBoardByIdController,
} from '../controllers/boards.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createBoardValidationSchema } from '../validation/createBoardValidationSchema.js';
import { authenticate } from '../middlewares/authenticate.js';

const boardRouter = Router();

boardRouter.use('/', authenticate);

boardRouter.use('boardId', validateMongoIdParam('boardId'));

boardRouter.post(
  '/',
  validateBody(createBoardValidationSchema),
  controllerWrapper(createBoardController),
);

boardRouter.patch('/:boardId', controllerWrapper(updateBoardByIdController));

boardRouter.get('/', controllerWrapper(getAllBoardsController));
boardRouter.get('/:boardId', controllerWrapper(getBoardByIdController));
boardRouter.delete('/:boardId', controllerWrapper(deleteBoardByIdController));

export default boardRouter;
