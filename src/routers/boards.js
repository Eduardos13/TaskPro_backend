import { Router } from 'express';
import { validateMongoIdParam } from '../middlewares/validateMongoIdParam.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import {
  createBoardController,
  getAllBoardsController,
} from '../controllers/boards.js';

const boardRouter = Router();

boardRouter.use('boardId', validateMongoIdParam('boardId'));

boardRouter.post('/', controllerWrapper(createBoardController));

boardRouter.get('/', controllerWrapper(getAllBoardsController));

export default boardRouter;
