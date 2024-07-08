import express from "express";
import {
  createTodo,
  deleteTodo,
  getOneTodo,
  updateTodo,
  changeColumn,
  updateTodoOrder
} from "../controllers/todoControllers.js";

import { createTodoSchema, updateTodoSchema } from "../schemas/todoSchema.js";

import { authenticate } from "../helpers/authenticate.js";
import { isValidId } from "../helpers/isValidId.js";
import validateBody from "../helpers/validateBody.js";

export const todoRouter = express.Router();

todoRouter.post(
  "/create/:columnId",
  authenticate,
  isValidId("columnId"),
  validateBody(createTodoSchema),
  createTodo
);

todoRouter.get("/:todoId", authenticate, isValidId("todoId"), getOneTodo);

todoRouter.delete("/:todoId", authenticate, isValidId("todoId"), deleteTodo);

todoRouter.patch(
  "/update/:todoId",
  authenticate,
  isValidId("todoId"),
  validateBody(updateTodoSchema),
  updateTodo
);

todoRouter.patch(
  "/:todoId/:columnId/update",
  authenticate,
  isValidId("todoId"),
  isValidId("columnId"),
  changeColumn
);
todoRouter.patch(
  "/update-order/:columnId",
  authenticate,
  isValidId("columnId"),
  updateTodoOrder
);

export default todoRouter;
