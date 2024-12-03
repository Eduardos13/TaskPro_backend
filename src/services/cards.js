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

export const getAllCards = async (userId) => {
  const cards = await cardsModel
    .find()
    .populate('board')
    .where('board.owner')
    .equals(userId);
  return cards;
};

export const getCardById = async (cardId, userId) => {
  const card = await cardsModel.findById({ _id: cardId }).populate('board');

  if (!card) {
    throw createHttpError(404, {
      message: `Card with id ${cardId} doesnt exist`,
    });
  }

  if (card.board.owner.toString() !== userId.toString()) {
    throw createHttpError(403, 'Access denied');
  }
  return card;
};

export const deleteCardById = async (cardId) => {
  await cardsModel.findByIdAndDelete(cardId);
};
