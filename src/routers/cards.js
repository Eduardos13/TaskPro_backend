import { Router } from 'express';
import { getAllCards, getCardById } from '../services/cards.js';

const cardsRouter = Router();

cardsRouter.get('/', async (req, res) => {
  const cards = await getAllCards();

  res.status(200).json({
    cards,
  });
});

cardsRouter.get('/:cardId', async (req, res) => {
  const { cardId } = req.params;
  const card = await getCardById(cardId);

  if (!card) {
    return res.status(404).json({
      status: 404,
      message: `Card with id ${cardId} doesnt exist`,
    });
  }

  res.status(200).json({
    card,
  });
});

export default cardsRouter;
