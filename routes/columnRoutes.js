import express from "express";
import {
  createColumn,
  deleteColumn,
  getAllColumns,
  getOneColumn,
  updateColumn,
} from "../controllers/columnsController.js";
//import { schemas } from "../schemas";
//import {validates} from "../middlewares";

export const columnRouter = express.Router();

/**
  |============================
  | ROUTES
  |============================
*/

// Створює нову колонку
// 1. Валідовує тіло запиту за схемою створення колонки.
// 2. Аутентифікує користувача.
// 3. Перевіряє валідність ідентифікатора дошки.
// 4. Викликає контроллер для створення колонки.
// columnsRouter.post("/:boardId", validates, authenticate, controllerName);
columnRouter.post("/:boardId", createColumn);

// Отримує всі колонки дошки поточного користувача
// 1. Аутентифікує користувача.
// 2. Викликає контроллер для отримання всіх колонки дошк.
// dashboardRoutes.get("/", authenticate, controllerName);
columnRouter.get("/:boardId", getAllColumns);

// Отримує колонку за ідентифікатором
// 1. Перевіряє валідність ідентифікатора колонки.
// 2. Перевіряє, що запит не містить ідентифікатор в тілі.
// 3. Аутентифікує користувача.
// 4. Викликає контроллер для отримання колонки за ідентифікатором.
// columnsRouter.get("/:columnId", validates, authenticate, controllerName);    getOneColumn
columnRouter.get("/:boardId/:columnId", getOneColumn);    

// Видаляє колонку за ідентифікатором
// 1. Перевіряє валідність ідентифікатора колонки.
// 2. Перевіряє, що запит не містить ідентифікатор в тілі.
// 3. Аутентифікує користувача.
// 4. Викликає контроллер для видалення колонки за ідентифікатором.
// columnsRouter.delete("/:columnId", validates, authenticate, controllerName);
columnRouter.delete("/:boardId/:columnId", deleteColumn);

// Оновлює колонку за ідентифікатором
// 1. Перевіряє валідність ідентифікатора колонки.
// 2. Перевіряє, що запит не містить ідентифікатор в тілі.
// 3. Валідовує тіло запиту за схемою оновлення колонки.
// 4. Аутентифікує користувача.
// 5. Викликає контроллер для оновлення колонки за ідентифікатором.
// columnsRouter.patch("/:columnId", validates, authenticate, controllerName);
columnRouter.patch("/:boardId/:columnId", updateColumn);

export default columnRouter;