import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";
import HttpError from "./HttpError.js";

dotenv.config();
const { ACCESS_SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(new HttpError(401, "Unauthorized"));
  }
  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.accessToken || user.accessToken !== token) {
      return next(new HttpError(401, "Unauthorized"));
    }
    req.user = user;

    next();
  } catch (error) {
    next(new HttpError(401, "Unauthorized"));
  }
};
