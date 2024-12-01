import createHttpError from 'http-errors';
import { boadrModel } from '../db/models/board.js';

export const createBoard = async (payload, userId) => {
  return await boadrModel.create({ ...payload, owner: userId });
};

export const getAllBoards = async (userId) => {
  const boards = await boadrModel.find({ owner: userId });
  return boards;
};

export const getBoardById = async (boardId) => {
  const board = await boadrModel.findById(boardId).populate('columns');

  // if (!board) {
  //   throw createHttpError(404, {
  //     message: `Board with id ${boardId} doesnt exist`,
  //   });
  // }

  return board;
};

export const deleteBoardById = async (boardId) => {
  await boadrModel.findByIdAndDelete(boardId);
};
