import { cardsModel } from '../db/models/card.js';

export const getAllCards = async () => {
  const cards = await cardsModel.find(); // Add boardID later
  return cards;
};

export const getCardById = async (cardId) => {
  const card = await cardsModel.findById({ _id: cardId });
  return card;
};

// export const createCard = async () => {};
// export const updateCard = async () => {};
// export const deleteCard = async () => {};
