import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  signUpSchema,
  signInSchema,
  refreshSchema,
  updateUserInfoSchema,
} from "../schemas/userSchema.js";
import { authenticate } from "../helpers/authenticate.js";
import { upload } from "../helpers/upload.js";
import {
  signUp,
  signIn,
  signOut,
  current,
  updateUserInfo,
  updateAvatar,
  refresh,
  googleAuth,
} from "../controllers/usersControllers.js";
import passport from "../helpers/google-authenticate.js";

export const userRouter = express.Router();


userRouter.post("/signUp", validateBody(signUpSchema), signUp);
userRouter.post("/signIn", validateBody(signInSchema), signIn);
userRouter.post("/signOut", authenticate, signOut);
userRouter.get("/current", authenticate, current);
userRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);
userRouter.post("/refresh", validateBody(refreshSchema), refresh);
userRouter.patch(
  "/update",
  authenticate,
  upload.single('avatar'),
  validateBody(updateUserInfoSchema),
  updateUserInfo
);
userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
userRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);
