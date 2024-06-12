import express from "express";
import {
  createColumn,
  deleteColumn,
  getOneColumn,
  updateColumn,
} from "../controllers/columnsControllers.js";

import {
  createColumnSchema,
  updateColumnSchema,
} from "../schemas/columnSchema.js";

import { authenticate } from "../helpers/authenticate.js";
import { isValidId } from "../helpers/isValidId.js";
import validateBody from "../helpers/validateBody.js";

export const columnRouter = express.Router();

columnRouter.post(
  "/create/:boardId",
  authenticate,
  validateBody(createColumnSchema),
  isValidId("boardId"),
  createColumn
);

columnRouter.get(
  "/:columnId",
  authenticate,
  isValidId("columnId"),
  getOneColumn
);

columnRouter.delete(
  "/:columnId",
  authenticate,
  isValidId("columnId"),
  deleteColumn
);

columnRouter.patch(
  "/:columnId",
  authenticate,
  isValidId("columnId"),
  validateBody(updateColumnSchema),
  updateColumn
);

export default columnRouter;
