import {
  createCard,
  deleteCardById,
  getAllCards,
  getCardById,
} from '../services/cards.js';

export const createCardController = async (req, res) => {
  const card = await createCard(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfually created a new card',
    data: card,
  });
};

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

export const deleteCardByIdController = async (req, res) => {
  const { cardId } = req.params;

  await deleteCardById(cardId);

  res.status(204).send();
};
