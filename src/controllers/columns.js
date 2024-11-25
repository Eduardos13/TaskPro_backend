import { deleteColumnById, getAllColumns } from '../services/columns.js';

export const getAllColumnsController = async (req, res) => {
  const columns = await getAllColumns();

  res.status(200).json({
    status: 200,
    message: 'Successfully found all columns',
    columns,
  });
};

export const deleteColumnByIdController = async (req, res) => {
  const { columnId } = req.params;

  await deleteColumnById(columnId);

  res.status(204).send();
};
