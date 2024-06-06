import { Column } from "../schemas/columnsSchemas";

// Додає нову колонку до бази даних.
export const addColumn = async (body) => {
  return Column.create(body);
};

// Отримує колонку за її ідентифікатором.
export const getColumnById = async (columnId) => {
  return Column.findById(columnId);
};

// Видаляє колонку за її ідентифікатором.
export const removeColumn = async (columnId) => {
  return Column.findByIdAndDelete(columnId);
};

// Оновлює поточну колонку за ідентифікатором та даними з тіла запиту.
export const updateColumn = async (columnId, body) => {
  return Column.findByIdAndUpdate(columnId, { ...body }, { new: true });
};

export default {
  getColumnById,
  removeColumn,
  addColumn,
  updateColumn,
};
