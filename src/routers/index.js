import { Router } from 'express';
import cardsRouter from './cards.js';
import columnsRouter from './columns.js';
import authRouter from './auth.js';

const router = Router();

router.use('/cards', cardsRouter);
router.use('/columns', columnsRouter);
router.use('/auth', authRouter);

export default router;
