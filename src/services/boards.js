import { boadrModel } from '../db/models/board.js';

export const createBoard = async (payload) => {
  return await boadrModel.create(payload);
};

export const getAllBoards = async () => {
  const boards = await boadrModel.find();
  return boards;
};
