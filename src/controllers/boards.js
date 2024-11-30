import { createBoard, getAllBoards } from '../services/boards.js';

export const createBoardController = async (req, res) => {
  const board = createBoard(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a new board',
    data: board,
  });
};

export const getAllBoardsController = async (req, res) => {
  const boards = await getAllBoards();

  res.status(200).json({
    status: 200,
    message: 'Successfully found all boards',
    boards,
  });
};
