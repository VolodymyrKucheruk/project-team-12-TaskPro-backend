import Column from "../models/columnModel.js";
import Todo from "../models/todoModel.js";

export const createColumn = async (req, res, next) => {
  const { boardId: ownerBoard } = req.params;

  try {
    const newColumn = await Column.create({
      title: req.body.title,
      ownerBoard,
    });
    res.status(201).json(newColumn);
  } catch (error) {
    next(error);
  }
};

export const getOneColumn = async (req, res, next) => {
  const { columnId } = req.params;

  try {
    const column = await Column.findById(columnId);
    if (!column) {
      return res.status(404).json({ message: "Not found" });
    }

    const todos = await Todo.find({ column: column._id });

    res.status(200).json({
      column,
      todos,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteColumn = async (req, res, next) => {
  const { columnId } = req.params;

  try {
    const column = await Column.findById(columnId);
    if (!column) {
      return next(HttpError(404, "Колонку не знайдено"));
    }

    const todos = await Todo.find({ ownerColumn: columnId });

    let deletedTodos = [];
    if (todos.length > 0) {
      deletedTodos = await Todo.deleteMany({ ownerColumn: columnId });
    }

    const deletedColumn = await Column.findByIdAndDelete(columnId);

    res.status(200).json({
      deletedColumn,
      deletedTodos,
    });
  } catch (error) {
    next(error);
  }
};

export const updateColumn = async (req, res, next) => {
  const { columnId } = req.params;

  try {
    const updatedColumn = await Column.findByIdAndUpdate(
      columnId,
      { title: req.body.title },
      { new: true }
    );

    if (!updatedColumn) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedColumn);
  } catch (error) {
    next(error);
  }
};
