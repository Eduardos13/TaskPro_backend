import createHttpError from 'http-errors';
import { columnModel } from '../db/models/column.js';

export const createColumn = async (payload) => {
  return await columnModel.create(payload);
};

// export const getAllColumns = async (userId) => {
//   const columns = await columnModel
//     .find()
//     .populate('board')
//     .where('board.owner')
//     .equals(userId);

//   return columns;
// };

export const updateColumnById = async (columnId, updateData) => {
  const updatedColumn = await columnModel.findByIdAndUpdate(
    columnId,
    updateData,
    { new: true },
  );

  if (!updatedColumn) {
    throw createHttpError(404, `Column with id ${columnId} doesn't exist`);
  }

  return updatedColumn;
};

export const getAllColumns = async (userId) => {
  const columns = await columnModel.find().populate({
    path: 'board',
    match: { owner: userId },
  });

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
