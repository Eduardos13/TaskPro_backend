import { Router } from 'express';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import {
  createColumnController,
  deleteColumnByIdController,
  getAllColumnsController,
  getColumnByIdController,
} from '../controllers/columns.js';
import { validateMongoIdParam } from '../middlewares/validateMongoIdParam.js';
import { authenticate } from '../middlewares/authenticate.js';

const columnsRouter = Router();

columnsRouter.use('/', authenticate);

columnsRouter.use('/:columnId', validateMongoIdParam('columnId'));

columnsRouter.post('/', controllerWrapper(createColumnController));
columnsRouter.get('/', controllerWrapper(getAllColumnsController));
columnsRouter.get('/:columnId', controllerWrapper(getColumnByIdController));
columnsRouter.delete(
  '/:columnId',
  controllerWrapper(deleteColumnByIdController),
);

export default columnsRouter;
