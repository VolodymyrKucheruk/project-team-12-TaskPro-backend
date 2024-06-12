import Todo from "../models/todoModel.js";

export const createTodo = async (req, res, next) => {
  const { columnId: ownerColumn } = req.params;

  try {
    const newTodo = await Todo.create({
      ...req.body,
      ownerColumn,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

export const getOneTodo = async (req, res, next) => {
  const { todoId } = req.params;

  try {
    const todo = await Todo.findById({
      _id: todoId,
    });
    if (!todo) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  const { todoId } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete({
      _id: todoId,
    });
    if (!todo) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  const { todoId } = req.params;

  try {
    const result = await Todo.findByIdAndUpdate(
      todoId,
      { ...req.body },
      { new: true }
    );
    if (!result) {
      return next(HttpError(404, "Todo not found"));
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const changeColumn = async (req, res, next) => {
  try {
    const { todoId, columnId } = req.params;
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { ownerColumn: columnId },
      { new: true }
    );

    if (!todo) {
      return next(HttpError(404, "Todo not found"));
    }

    res.status(200).json(todo);
  } catch (error) {и
    next(error);
  }
};
