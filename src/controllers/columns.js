import {
  deleteColumnById,
  getAllColumns,
  getColumnById,
} from '../services/columns.js';

export const getAllColumnsController = async (req, res) => {
  const columns = await getAllColumns();

  res.status(200).json({
    status: 200,
    message: 'Successfully found all columns',
    columns,
  });
};

export const getColumnByIdController = async (req, res) => {
  const { columnId } = req.params;

  const column = await getColumnById(columnId);

  res.status(200).json({
    status: 200,
    message: `Successfully found a column with id ${columnId}`,
    column,
  });
};

export const deleteColumnByIdController = async (req, res) => {
  const { columnId } = req.params;

  await deleteColumnById(columnId);

  res.status(204).send();
};
