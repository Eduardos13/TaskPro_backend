import { getBoardById } from '../services/boards.js';
import {
  createColumn,
  deleteColumnById,
  getAllColumns,
  getColumnById,
  updateColumnById,
} from '../services/columns.js';

export const createColumnController = async (req, res) => {
  const { boardId, title } = req.body;
  const userId = req.user._id;

  const board = await getBoardById(boardId);

  if (board.owner.toString() !== userId.toString()) {
    return res.status(403).json({
      status: 403,
      message: 'Access denied',
    });
  }

  if (!board) {
    return res.status(404).json({
      status: 404,
      message: `Board with id ${boardId} is not found`,
    });
  }

  const column = await createColumn({ title, board: boardId });

  board.columns.push(column._id);
  await board.save();

  res.status(201).send({
    status: 201,
    message: 'Successfully created a new column',
    data: column,
  });
};

export const updateColumnByIdController = async (req, res) => {
  const { columnId } = req.params;
  const updateData = req.body;

  const updatedColumn = await updateColumnById(columnId, updateData);

  res.status(200).json({
    status: 200,
    message: `Successfully updated column with id ${columnId}`,
    data: updatedColumn,
  });
};

export const getAllColumnsController = async (req, res) => {
  const userId = req.user._id;

  const columns = await getAllColumns(userId);

  res.status(200).json({
    status: 200,
    message: 'Successfully found all columns',
    data: columns,
  });
};

export const getColumnByIdController = async (req, res) => {
  const { columnId } = req.params;
  const userId = req.user._id;

  const column = await getColumnById(columnId, userId);

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
