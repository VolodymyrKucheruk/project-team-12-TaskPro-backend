import Todo from "../models/todoModel.js";

import { createTodoSchema } from "../schemas/todoSchema.js"; 
// Логіка пов'язана з контроллерами задач (Todo):

// createTodo: Створює нову задачу для колонки та повертає її у відповіді.
// 1. Отримує ідентифікатор колонки з параметрів запиту.
// 2. Викликає сервіс для додавання нової задачі з даними з тіла запиту та ідентифікатором колонки.
// 3. Відповідає з статусом 201 та новоствореною задачею.

export const createTodo = async (req, res, next) => {    
  const todo = {
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    deadline: req.body.deadline,
    // ідентифікатор column в якій створюємо картку, при цьому беремо id column з запита на фронтенді
    ownerColumn: req.params.columnId,
  };

  try {
    const result = await Todo.create(todo);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }   
};

// getAllTodos: Отримує всіколонки дошки, створені поточним користувачем, та повертає їх у відповіді.
// 1. Отримує ідентифікатор користувача з запиту.
// 2. Викликає сервіс для отримання списку всіх дошок користувача.
// 3. Відповідає з статусом 200 та списком дошок.

export const getAllTodos = async (req, res, next) => {   
  try {
    // запит всіх Todos in column 
    const result = await Todo.find({ ownerColumn: req.params.columnId });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// getById: Отримує задачу за ідентифікатором та повертає її у відповіді.
// 1. Отримує ідентифікатор задачі з параметрів запиту.
// 2. Викликає сервіс для отримання задачі за ідентифікатором.
// 3. Відповідає з статусом 200 та знайденою задачею. 

export const getOneTodo = async (req, res, next) => {  
  // отримуємо ідентифікаторu Column з id
  const { columnId, todoId } = req.params;

  // потрібно додати Joi валідацію значень полів щодо id на тип ObjectId !!!!!!!! 
  try {
    //  пошук з ідентифікатором   - якшо немає такого id - findById повертає null
    const result = await Todo.findById({
      ownerColumn: columnId,
      _id: todoId,
    });
    //  обробка помилки - якщо card не знайдено
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// deleteTodo: Видаляє задачу за ідентифікатором та повертає видалену задачу у відповіді.
// 1. Отримує ідентифікатор задачі з параметрів запиту.
// 2. Викликає сервіс для видалення задачі за ідентифікатором.
// 3. Відповідає з статусом 200 та видаленою задачею.

export const deleteTodo = async (req, res, next) => {   
  // отримуємо ідентифікаторu картки
  const { columnId, todoId } = req.params; 
  
  try {
    // якщо треба видалити не за id - метод findOneAndDelete({name: "Iv"} ) та зазначити по якому полю 
    const result = await Todo.findByIdAndDelete({
      ownerColumn: columnId,
      _id: todoId,
    });
    // перевірка - обробка помилки - якщо картку не знайдено
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// updateTodo: Оновлює поточну card in column за ідентифікатором та повертає оновлену card
// 1. Отримує ідентифікатор задачі з параметрів запиту.
// 2. Викликає сервіс для оновлення задачі за ідентифікатором та даними з тіла запиту.
// 3. Відповідає з статусом 200 та оновленою задачею.

export const updateTodo = async (req, res, next) => {   
  const { columnId, todoId } = req.params;

  const todo = {
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    deadline: req.body.deadline,
    // ідентифікатор column в який оновлюється card
    ownerColumn: req.params.columnId,
  };

  try {
    // щоб findByIdAndUpdate ПОВЕРНУВ актуальну(а не стару) версію документа треба додати { new: true} -
    const result = await Todo.findByIdAndUpdate(
      {
      ownerColumn: columnId,
      _id: todoId,
      }, todo,
      {
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


// changeColumn: Змінює колонку для задачі та повертає оновлену задачу у відповіді.
// 1. Отримує ідентифікатори задачі та нової колонки з параметрів запиту.
// 2. Викликає сервіс для зміни колонки задачі за ідентифікаторами.
// 3. Відповідає з статусом 200 та оновленою задачею.

export const changeColumn = async (req, res) => {
  // ...
};

