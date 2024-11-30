import createHttpError from 'http-errors';
import { boadrModel } from '../db/models/board.js';

export const createBoard = async (payload) => {
  return await boadrModel.create(payload);
};

export const getAllBoards = async () => {
  const boards = await boadrModel.find();
  return boards;
};

export const getBoardById = async (boardId) => {
  const board = await boadrModel.findById({ _id: boardId });

  if (!board) {
    throw createHttpError(404, {
      message: `Board with id ${boardId} doesnt exist`,
    });
  }

  return board;
};

export const deleteBoardById = async (boardId) => {
  await boadrModel.findByIdAndDelete(boardId);
};
