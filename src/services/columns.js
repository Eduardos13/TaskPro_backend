import { columnModel } from '../db/models/column.js';

export const createColumn = async (payload) => {
  return await columnModel.create(payload);
};

export const getAllColumns = async () => {
  const columns = await columnModel.find();
  return columns;
};

export const getColumnById = async (columnId) => {
  const column = await columnModel.findById({ _id: columnId });

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
