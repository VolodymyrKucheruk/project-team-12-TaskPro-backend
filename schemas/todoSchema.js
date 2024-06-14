import Joi from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  priority: Joi.string().required(),
  deadline: Joi.string().required(),
});
export const updateTodoSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string(),
  deadline: Joi.string(),
});