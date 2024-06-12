import Board from "../models/boardModel.js";
import Column from "../models/columnModel.js";
import Todo from "../models/todoModel.js";
import mongoose from "mongoose";
import { getUserBoards } from "../services/boardsService.js"

export const createBoard = async (req, res, next) => {
  try {
    const { _id: ownerUser } = req.user;
    const newBoard = await Board.create({ ...req.body, ownerUser });
    res.status(201).json(newBoard);
  } catch (error) {
    next(error);
  }
};


export const getAllBoards = async (req, res, next) => {
  try {
    const result = await getUserBoards(req.user.id);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const getOneBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findById(boardId);
    if (!board) {
      return next(HttpError(404, "Board not found"));
    }

    const columnsWithTodos = await Column.aggregate([
      { $match: { ownerBoard: new mongoose.Types.ObjectId(boardId) } },
      {
        $lookup: {
          from: "todos",
          localField: "_id",
          foreignField: "ownerColumn",
          as: "todos",
        },
      },
    ]);

    res.json({ board, columns: columnsWithTodos });
  } catch (error) {
    next(error);
  }
};


export const deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const board = await Board.findById(boardId);

    if (!board) {
      return next(HttpError(404, "Board not found"));
    }

    const deletedBoard = await Board.findByIdAndDelete(boardId);
    const columns = await Column.find({ board: boardId });
    const ArrayColumnsIds = columns.map((column) => column._id);

    const [deletedColumns, deletedTodos] = await Promise.all([
      Column.deleteMany({ board: boardId }),
      Todo.deleteMany({ column: ArrayColumnsIds }),
    ]);

    res.json({
      deletedBoard,
      deletedColumns,
      deletedTodos,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCurrentBoard = async (req, res, next) => {
  const { boardId } = req.params;

  try {
    const board = await Board.findByIdAndUpdate(
      boardId,
      { ...req.body },
      { new: true }
    );
    if (!board) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(board);
  } catch (error) {
    next(error);
  }
};
