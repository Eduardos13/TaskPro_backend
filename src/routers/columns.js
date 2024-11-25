import { Router } from 'express';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import {
  deleteColumnByIdController,
  getAllColumnsController,
} from '../controllers/columns.js';

const columnsRouter = Router();

columnsRouter.get('/', controllerWrapper(getAllColumnsController));
columnsRouter.delete(
  '/:columnId',
  controllerWrapper(deleteColumnByIdController),
);

export default columnsRouter;
