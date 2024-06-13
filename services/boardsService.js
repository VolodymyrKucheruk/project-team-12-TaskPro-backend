import Board from "../models/boardModel.js";
import mongoose from "mongoose";

export const getUserBoards = async (userId) => {
  console.log(`Fetching boards for user with ID: ${userId}`);
  const boards = await Board.find({
    ownerUser: new mongoose.Types.ObjectId(userId),
  });
  console.log(`Boards found for user with ID: ${userId}`, boards);
  return boards;
};
