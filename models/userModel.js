import { model, Schema } from "mongoose";
import { emailRegexp } from "./regex.js";


const themeVariants = ["violet", "light", "dark"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: false,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      enum: themeVariants,
      default: "light",
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },

  { versionKey: false, timestamps: true }
);

export const User = model("User", userSchema);
