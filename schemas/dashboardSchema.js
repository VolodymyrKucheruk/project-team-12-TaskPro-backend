import Joi from "joi";

export const createDashboardSchema = Joi.object({
  title: Joi.string().required(),
  icons: Joi.string().required(),
  background: Joi.string().required(),
});



