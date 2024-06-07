
import Joi, { required } from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().required(),
//   deadline: Joi.string().required(),
});




