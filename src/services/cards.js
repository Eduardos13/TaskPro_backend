import createHttpError from 'http-errors';
import { cardsModel } from '../db/models/card.js';

export const createCard = async (payload) => {
  return await cardsModel.create(payload);
};

export const updateCard = async (cardId, payload) => {
  const card = await cardsModel.findByIdAndUpdate(cardId, payload, {
    new: true,
  });

  if (!card) {
    throw createHttpError(404, {
      message: `Card with id ${cardId} doesnt exist`,
    });
  }

  return card;
};

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
