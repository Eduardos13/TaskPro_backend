import {
  createBoard,
  deleteBoardById,
  getAllBoards,
  getBoardById,
} from '../services/boards.js';

export const createBoardController = async (req, res) => {
  const board = await createBoard(req.body, req.user._id);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a new board',
    data: board,
  });
};

export const getAllBoardsController = async (req, res) => {
  const boards = await getAllBoards();

  if (!boards) {
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

  const board = await getBoardById(boardId);

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
