import { Todo } from "../schemas/todosSchemas";

// Додає нову задачу до бази даних.
export const addTodo = async (body) => {
  return Todo.create(body);
};

// Отримує задачу за її ідентифікатором.
export const getTodoById = async (todoId) => {
  return Todo.findById(todoId);
};

// Видаляє задачу за її ідентифікатором.
export const removeTodo = async (todoId) => {
  return Todo.findByIdAndDelete(todoId);
};

// Оновлює поточну задачу за ідентифікатором та даними з тіла запиту.
export const updateTodo = async (todoId, body) => {
  return Todo.findByIdAndUpdate(todoId, { ...body }, { new: true });
};

// Змінює колонку для задачі за ідентифікатором задачі та нової колонки.
export const changeColumn = async (todoId, columnId) => {
  return Todo.findByIdAndUpdate(todoId, { column: columnId }, { new: true });
};

export default {
  getTodoById,
  removeTodo,
  addTodo,
  updateTodo,
  changeColumn,
};
