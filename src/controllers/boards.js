import {
  createBoard,
  deleteBoardById,
  getAllBoards,
  getBoardById,
  updateBoardById,
} from '../services/boards.js';

export const createBoardController = async (req, res) => {
  const board = await createBoard(req.body, req.user._id);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a new board',
    data: board,
  });
};

export const updateBoardByIdController = async (req, res) => {
  const { boardId } = req.params;
  const updateData = req.body;

  const updatedBoard = await updateBoardById(boardId, updateData);

  res.status(200).json({
    status: 200,
    message: `Successfully updated board with id ${boardId}`,
    data: updatedBoard,
  });
};

export const getAllBoardsController = async (req, res) => {
  const userId = req.user._id;

  const boards = await getAllBoards(userId);

  if (!boards || boards.length === 0) {
    res.status(404).json({
      status: 404,
      message: 'No boards have been found',
    });
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found all boards',
    boards,
  });
};

export const getBoardByIdController = async (req, res) => {
  const { boardId } = req.params;
  const userId = req.user._id;

  const board = await getBoardById(boardId);

  if (!board || board.owner.toString() !== userId.toString()) {
    return res.status(404).json({
      status: 404,
      message: `Board with id ${boardId} is not found`,
    });
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found a card with id ${boardId}`,
    board,
  });
};

export const deleteBoardByIdController = async (req, res) => {
  const { boardId } = req.params;

  await deleteBoardById(boardId);

  res.status(204).send();
};
