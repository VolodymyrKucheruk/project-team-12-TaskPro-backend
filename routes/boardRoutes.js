import express from "express";
import {
  createBoard,
  deleteBoard,
  getAllBoards,
  getOneBoard,
  updateCurrentBoard,
} from "../controllers/boardControllers.js";

import {
  createBoardSchema,
  updateBoardSchema,
} from "../schemas/boardSchema.js";

import { authenticate } from "../helpers/authenticate.js";
import { isValidId } from "../helpers/isValidId.js";
import validateBody from "../helpers/validateBody.js";

export const boardRouter = express.Router();

boardRouter.post(
  "/create",
  validateBody(createBoardSchema),
  authenticate,
  createBoard
);

boardRouter.get("/", authenticate, getAllBoards);

boardRouter.get("/:boardId", authenticate, isValidId("boardId"), getOneBoard);

boardRouter.delete(
  "/:boardId",
  authenticate,
  isValidId("boardId"),
  deleteBoard
);

boardRouter.patch(
  "/update/:boardId",
  validateBody(updateBoardSchema),
  isValidId("boardId"),
  authenticate,
  updateCurrentBoard
);

export default boardRouter;
