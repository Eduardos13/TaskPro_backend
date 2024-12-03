import createHttpError from 'http-errors';
import { columnModel } from '../db/models/column.js';

export const createColumn = async (payload) => {
  return await columnModel.create(payload);
};

export const getAllColumns = async (userId) => {
  const columns = await columnModel
    .find()
    .populate('board')
    .where('board.owner')
    .equals(userId);

  return columns;
};

export const getColumnById = async (columnId, userId) => {
  const column = await columnModel
    .findById({ _id: columnId })
    .populate('board');

  if (!column) {
    throw createHttpError(404, {
      message: `Column with id ${columnId} doesnt exist`,
    });
  }

  return column;
};

export const deleteColumnById = async (columnId) => {
  await columnModel.findByIdAndDelete(columnId);
};
