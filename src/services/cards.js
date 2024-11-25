import createHttpError from 'http-errors';
import { cardsModel } from '../db/models/card.js';

export const createCard = async (payload) => {
  return await cardsModel.create(payload);
};

export const updateCard = async (cardId, payload, options = {}) => {
  const rawCardResult = await cardsModel.findByIdAndUpdate(cardId, payload, {
    new: true, // returning a new card right now
    includeResultMetadata: true,
    ...options, // allowing to upsert the card and create it if it wasnt exist
  });

  if (!rawCardResult.value) {
    throw createHttpError(404, {
      message: `Card with id ${cardId} doesnt exist`,
    });
  }

  return {
    card: rawCardResult.value,
    isNew: !rawCardResult.lastErrorObject.updatedExisting,
  };
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
