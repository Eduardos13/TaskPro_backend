import { Router } from 'express';
import { validateMongoIdParam } from '../middlewares/validateMongoIdParam.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import {
  createBoardController,
  deleteBoardByIdController,
  getAllBoardsController,
} from '../controllers/boards.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createBoardValidationSchema } from '../validation/createBoardValidationSchema.js';

const boardRouter = Router();

boardRouter.use('boardId', validateMongoIdParam('boardId'));

boardRouter.post(
  '/',
  validateBody(createBoardValidationSchema),
  controllerWrapper(createBoardController),
);

boardRouter.get('/', controllerWrapper(getAllBoardsController));
boardRouter.delete('/:boardId', controllerWrapper(deleteBoardByIdController));

export default boardRouter;
