import Joi from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().required(),
  deadline: Joi.string(),
});
export const updateTodoSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string(),
  deadline: Joi.string(),
});