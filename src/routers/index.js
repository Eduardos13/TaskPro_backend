import { Router } from 'express';
import cardsRouter from './cards.js';
import columnsRouter from './columns.js';

const router = Router();

router.use('/cards', cardsRouter);
router.use('/columns', columnsRouter);

export default router;
