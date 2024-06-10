import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const signUpSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email must be a valid email address",
  }),
  password: Joi.string().required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email must be a valid email address",
  }),
  password: Joi.string().required(),
});
export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const updateUserInfoSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().pattern(emailRegexp).messages({
    "string.pattern.base": "Email must be a valid email address",
  }),
  password: Joi.string().min(8).max(32),
});
