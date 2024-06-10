import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string().required(),
  icons: Joi.string().required(),
  backgroundURL: Joi.string().required(),
});
export const updateBoardSchema = Joi.object({
  title: Joi.string(),
  iconURL: Joi.string(),
  backgroundURL: Joi.string(),
});



