import {
  createCard,
  deleteCardById,
  getAllCards,
  getCardById,
  updateCard,
} from '../services/cards.js';

export const createCardController = async (req, res) => {
  const card = await createCard(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a new card',
    data: card,
  });
};

export const patchCardController = async (req, res) => {
  const { cardId } = req.params;
  const { body } = req;

  const { card } = await updateCard(cardId, body);

  res.status(200).send({
    status: 200,
    message: 'Successfully updated card',
    data: card,
  });
};

export const putCardController = async (req, res) => {
  const { cardId } = req.params;
  const { body } = req;

  const { card, isNew } = await updateCard(cardId, body, { upsert: true });

  const status = isNew ? 201 : 200;

  res.status(status).send({
    status,
    message: 'Successfully upserted card',
    data: card,
  });
};

export const getAllCardsController = async (req, res) => {
  const cards = await getAllCards();

  res.status(200).json({
    status: 200,
    message: 'Successfully found all cards',
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
