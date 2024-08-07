import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string().required(),
  icon: Joi.string().required(),
  background: Joi.string().allow("").required(),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string(),
  icon: Joi.string(),
  background: Joi.string().allow(""),
});
