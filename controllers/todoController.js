import Todo from "../models/todoModel.js";

export const createTodo = async (req, res, next) => {
  const todo = {
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    deadline: req.body.deadline,
    ownerColumn: req.params.columnId,
  };
  try {
    const result = await Todo.create(todo);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllTodos = async (req, res, next) => {
  try {
    const result = await Todo.find({ ownerColumn: req.params.columnId });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneTodo = async (req, res, next) => {
  const { columnId, todoId } = req.params;

  try {
    const result = await Todo.findById({
      ownerColumn: columnId,
      _id: todoId,
    });
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  const { columnId, todoId } = req.params;

  try {
    const result = await Todo.findByIdAndDelete({
      ownerColumn: columnId,
      _id: todoId,
    });

    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  const { columnId, todoId } = req.params;

  const todo = {
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    deadline: req.body.deadline,
    ownerColumn: req.params.columnId,
  };

  try {
    const result = await Todo.findByIdAndUpdate(
      {
        ownerColumn: columnId,
        _id: todoId,
      },
      todo,
      {
        new: true,
      }
    );
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const changeColumn = async (req, res) => {
  try {
    const { todoId, columnId } = req.params;
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { column: columnId },
      { new: true }
    );

    if (!todo) {
      return next(HttpError(404, "Todo not found"));
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};
