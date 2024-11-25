import { Router } from 'express';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { getAllColumnsController } from '../controllers/columns.js';

const columnsRouter = Router();

columnsRouter.get('/', controllerWrapper(getAllColumnsController));

export default columnsRouter;
