import { getAllCards, getCardById } from '../services/cards.js';

export const getAllCardsController = async (req, res) => {
  const cards = await getAllCards();

  res.status(200).json({
    status: 200,
    message: 'Successfulle found all cards',
    cards,
  });
};

export const getCardByIdController = async (req, res, next) => {
  const { cardId } = req.params;
  const card = await getCardById(cardId);

  res.status(200).json({
    status: 200,
    message: `Successfully found a card with id ${cardId}`,
    card,
  });
};
