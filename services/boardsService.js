import Board from "../models/boardModel.js";
import mongoose from "mongoose";

export const getUserBoards = async (userId) => {
  const boards = await Board.find({
    ownerUser: new mongoose.Types.ObjectId(userId),
  });

  return boards;
};
