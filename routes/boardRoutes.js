import express from "express";
import {
  createBoard,
  deleteBoard,
  getAllBoards,
  getOneBoard,
  updateCurrentBoard,
} from "../controllers/boardControllers.js";
//import { schemas } from "../schemas";
//import {validates} from "../middlewares";
import {authenticate} from "../helpers/authenticate.js";

export const boardRouter = express.Router();


// Створює нову дошку
// 1. Валідовує тіло запиту за схемою створення дошки.
// 2. Аутентифікує користувача.
// 3. Викликає контроллер для створення дошки.
// dashboardRoutes.post("/", validates, authenticate, createDashboard);
boardRouter.post("/", authenticate, createBoard);

// Отримує всі дошки поточного користувача
// 1. Аутентифікує користувача.
// 2. Викликає контроллер для отримання всіх дошок.
// dashboardRoutes.get("/", authenticate, controllerName);
boardRouter.get("/", getAllBoards);

// Отримує дошку за ідентифікатором
// 1. Перевіряє валідність ідентифікатора дошки.
// 2. Перевіряє, що запит не містить ідентифікатор в тілі.
// 3. Аутентифікує користувача.
// 4. Перевіряє, що користувач є власником дошки.
// 5. Викликає контроллер для отримання дошки за ідентифікатором.
// dashboardRoutes.get("/:boardId", validates, authenticate, controllerName);
boardRouter.get("/:boardId", getOneBoard);

// Видаляє дошку за ідентифікатором
// 1. Перевіряє валідність ідентифікатора дошки.
// 2. Перевіряє, що запит не містить ідентифікатор в тілі.
// 3. Аутентифікує користувача.
// 4. Перевіряє, що користувач є власником дошки.
// 5. Викликає контроллер для видалення дошки за ідентифікатором.
// dashboardRoutes.delete("/:boardId", validates, authenticate, controllerName);
boardRouter.delete("/:boardId", deleteBoard);

// Оновлює дошку за ідентифікатором
// 1. Перевіряє валідність ідентифікатора дошки.
// 2. Перевіряє, що запит не містить ідентифікатор в тілі.
// 3. Валідовує тіло запиту за схемою оновлення дошки.
// 4. Аутентифікує користувача.
// 5. Перевіряє, що користувач є власником дошки.
// 6. Викликає контроллер для оновлення дошки за ідентифікатором.
// dashboardRoutes.patch("/:boardId", validates, authenticate, controllerName);
boardRouter.patch("/:boardId", updateCurrentBoard);

export default boardRouter;