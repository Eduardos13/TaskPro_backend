import createHttpError from 'http-errors';
import { cardsModel } from '../db/models/card.js';

export const getAllCards = async () => {
  const cards = await cardsModel.find(); // Add boardID later
  return cards;
};

export const getCardById = async (cardId) => {
  const card = await cardsModel.findById({ _id: cardId });

  if (!card) {
    throw createHttpError(404, {
      message: `Card with id ${cardId} doesnt exist`,
    });
  }

  return card;
};

export const deleteCardById = async (cardId) => {
  await cardsModel.findByIdAndDelete(cardId);
};

// export const createCard = async () => {};
// export const updateCard = async () => {};
