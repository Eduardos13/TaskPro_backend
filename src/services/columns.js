import { columnModel } from '../db/models/column.js';

export const getAllColumns = async () => {
  const columns = await columnModel.find();
  return columns;
};

export const deleteColumnById = async (columnId) => {
  await columnModel.findByIdAndDelete(columnId);
};
