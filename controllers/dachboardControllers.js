import Board from "../models/dashboardModel.js";

import { createBoardSchema } from "../schemas/dashboardSchema.js";

// Логіка пов'язана з контроллерами дошки:

// createBoard: Створює нову дошку для користувача та повертає її у відповіді.
// 1. Отримує ідентифікатор користувача з запиту.
// 2. Викликає сервіс для додавання нової дошки з даними з тіла запиту та ідентифікатором користувача.
// 3. Відповідає з статусом 201 та новоствореною дошкою.

export const createBoard = async (req, res, next) => {
  // ...
  const board = {
    title: req.body.title,
    icons: req.body.icons,
    background: req.body.background,
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

// getAllBoards: Отримує всі дошки, створені поточним користувачем, та повертає їх у відповіді.
// 1. Отримує ідентифікатор користувача з запиту.
// 2. Викликає сервіс для отримання списку всіх дошок користувача.
// 3. Відповідає з статусом 200 та списком дошок.

export const getAllBoards = async (req, res, next) => {
  // ...
  try {
    // запит всіх Boards в колекції
    const result = await Board.find();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }   
};

// getById: Отримує дошку за ідентифікатором, а також всі колонки та задачі, пов'язані з цією дошкою, та повертає їх у відповіді.
// 1. Отримує ідентифікатор дошки з параметрів запиту.
// 2. Шукає дошку за ідентифікатором у базі даних.
// 3. Шукає всі колонки, пов'язані з дошкою.
// 4. Виконує агрегацію для отримання задач, пов'язаних з кожною колонкою.
// 5. Відповідає з знайденою дошкою та колонками з задачами, або порожнім масивом колонок, якщо їх немає.

export const getOneBoard = async (req, res, next) => {
  // ...

  // отримуємо ідентифікатор сонтакту з id
  const { boardId } = req.params;

  // потрібно додати Joi валідацію значень полів щодо id на тип ObjectId !!!!!!!!

  try {
    //  пошук з ідентифікатором   - якшо немає такого id - findById повертає null
    const result = await Board.findById(boardId);
    //  обробка помилки - якщо контакт не знайдено
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// deleteBoard: Видаляє дошку за ідентифікатором разом з усіма пов'язаними колонками та задачами, та повертає видалені об'єкти у відповіді.
// 1. Отримує ідентифікатор дошки з параметрів запиту.
// 2. Видаляє дошку за ідентифікатором з бази даних.
// 3. Шукає всі колонки, пов'язані з дошкою.
// 4. Видаляє всі колонки, пов'язані з дошкою.
// 5. Створює масив ідентифікаторів колонок.
// 6. Видаляє всі задачі, пов'язані з колонками.
// 7. Відповідає з видаленими дошкою, колонками та задачами, або викликає помилку 404, якщо об'єкти не знайдено.

export const deleteBoard = async (req, res, next) => {
  // ...
  // отримуємо ідентифікатор board з id
  const { boardId } = req.params;
  console.log(req.params);
  try {
    // якщо треба видалити не за id - метод findOneAndDelete({name: "Iv"} ) та зазначити по якому полю
    const result = await Board.findByIdAndDelete(boardId);
    // перевірка - обробка помилки - якщо картку не знайдено
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// updateCurrentBoard: Оновлює поточну дошку за ідентифікатором та повертає оновлену дошку у відповіді.
// 1. Отримує ідентифікатор дошки з параметрів запиту.
// 2. Викликає сервіс для оновлення дошки за ідентифікатором та даними з тіла запиту.
// 3. Відповідає з статусом 200 та оновленою дошкою.

export const updateCurrentBoard = async (req, res, next) => {
  // ...
  // отримуємо ідентифікатор сонтакту з id
  const { boardId } = req.params;

  // об'єкт  board - з полями які зчитуються з боді 
  const board = {
    title: req.body.title,
    icons: req.body.icons,
    background: req.body.background,
    // ідентифікатор юзера який створює цей board,
    // при створенні board беремо id користувача з jwt- токена
    // owner: req.user.id,
  };

  try {
    // щоб findByIdAndUpdate ПОВЕРНУВ актуальну(нову а не стару) версію документа треба додати { new: true} -
    const result = await Board.findByIdAndUpdate(boardId, board, {
      new: true,
    });
    // перевірка - обробка помилки - якщо board не знайдено
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }




};
