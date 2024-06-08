import Todo from "../models/todoModel.js";

import { createTodoSchema } from "../schemas/todoSchema.js";

// Логіка пов'язана з контроллерами задач (Todo):

// createTodo: Створює нову задачу для колонки та повертає її у відповіді.
// 1. Отримує ідентифікатор колонки з параметрів запиту.
// 2. Викликає сервіс для додавання нової задачі з даними з тіла запиту та ідентифікатором колонки.
// 3. Відповідає з статусом 201 та новоствореною задачею.

export const createTodo = async (req, res, next) => {  
  // ...

  const todo = {
    title: req.body.title,
    description: req.body.icons,
    priority: req.body.background,
    deadline: req.body.title,   
    // ідентифікатор юзера який створює цей контакт,
    // при створенні контакту ми беремо id користувача з jwt- токена
    // owner: req.user.id,
  };

  try {
    const result = await Board.create(board);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }   
};

// getById: Отримує задачу за ідентифікатором та повертає її у відповіді.
// 1. Отримує ідентифікатор задачі з параметрів запиту.
// 2. Викликає сервіс для отримання задачі за ідентифікатором.
// 3. Відповідає з статусом 200 та знайденою задачею.

export const getById = async (req, res) => {
  // ...
};

// deleteTodo: Видаляє задачу за ідентифікатором та повертає видалену задачу у відповіді.
// 1. Отримує ідентифікатор задачі з параметрів запиту.
// 2. Викликає сервіс для видалення задачі за ідентифікатором.
// 3. Відповідає з статусом 200 та видаленою задачею.

export const deleteTodo = async (req, res) => {
  // ...
};

// updateTodo: Оновлює поточну задачу за ідентифікатором та повертає оновлену задачу у відповіді.
// 1. Отримує ідентифікатор задачі з параметрів запиту.
// 2. Викликає сервіс для оновлення задачі за ідентифікатором та даними з тіла запиту.
// 3. Відповідає з статусом 200 та оновленою задачею.

export const updateTodo = async (req, res) => {
  // ...
};

// changeColumn: Змінює колонку для задачі та повертає оновлену задачу у відповіді.
// 1. Отримує ідентифікатори задачі та нової колонки з параметрів запиту.
// 2. Викликає сервіс для зміни колонки задачі за ідентифікаторами.
// 3. Відповідає з статусом 200 та оновленою задачею.

export const changeColumn = async (req, res) => {
  // ...
};
