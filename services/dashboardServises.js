// import { Board } from "../schemas/boardsSchemas";

// Додає нову дошку до бази даних.
export const addBoard = async (body) => {
  return Board.create(body);
};

// Отримує всі дошки, створені певним користувачем.
export const listBoards = async (owner) => {
  return Board.find(owner);
};

// Отримує дошку за її ідентифікатором.
export const getBoardById = async (boardId) => {
  return Board.findById(boardId);
};

// Оновлює поточну дошку за ідентифікатором та даними з тіла запиту.
export const updateCurrentBoard = async (boardId, body) => {
  return Board.findByIdAndUpdate(boardId, { ...body }, { new: true });
};

