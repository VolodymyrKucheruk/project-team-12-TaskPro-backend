import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getOneTodo,
  updateTodo,
} from "../controllers/todoController.js";
// import { schemas } from "../schemas";
// import {validates} from "../middlewares";

export const todoRouter = express.Router();

/**
  |============================
  | ROUTES
  |============================
*/

// Створює нову задачу
// 1. Перевіряє валідність ідентифікатора колонки.
// 2. Валідовує тіло запиту за схемою створення задачі.
// 3. Аутентифікує користувача.
// 4. Викликає контроллер для створення задачі.
// todoRouter.post("/:columnId", validates, authenticate, controllerName);
todoRouter.post("/:columnId", createTodo);


// Отримує всі card in column поточного user
// 1. Аутентифікує користувача.
// 2. Викликає контроллер для отримання всіх колонки дошк.
// dashboardRoutes.get("/", authenticate, controllerName);
todoRouter.get("/:columnId", getAllTodos);

// Отримує задачу за ідентифікатором
// 1. Перевіряє валідність ідентифікатора задачі.
// 2. Перевіряє, що запит не містить ідентифікатор в тілі.
// 3. Аутентифікує користувача.
// 4. Викликає контроллер для отримання задачі за ідентифікатором.
// todosRouter.get("/:todoId", validates, authenticate, controllerName);  getOneTodo
todoRouter.get("/:columnId/:todoId", getOneTodo);

// Видаляє задачу за ідентифікатором
// 1. Перевіряє валідність ідентифікатора задачі.
// 2. Перевіряє, що запит не містить ідентифікатор в тілі.
// 3. Аутентифікує користувача.
// 4. Викликає контроллер для видалення задачі за ідентифікатором.
// todosRouter.delete("/:todoId", validates, authenticate, controllerName);
todoRouter.delete("/:columnId/:todoId", deleteTodo);

// Оновлює задачу за ідентифікатором
// 1. Перевіряє валідність ідентифікатора задачі.
// 2. Перевіряє, що запит не містить ідентифікатор в тілі.
// 3. Валідовує тіло запиту за схемою оновлення задачі.
// 4. Аутентифікує користувача.
// 5. Викликає контроллер для оновлення задачі за ідентифікатором.
// todosRouter.patch("/:todoId", validates, authenticate, controllerName); updateTodo
todoRouter.patch("/:columnId/:todoId", updateTodo);

// Змінює колонку для задачі
// 1. Перевіряє валідність ідентифікаторів колонки та задачі.
// 2. Аутентифікує користувача.
// 3. Викликає контроллер для зміни колонки задачі.
// todosRouter.patch(
//   "/:todoId/owner/:columnId",
//   validates,
//   authenticate,
//   controllerName
// );

export default todoRouter;
