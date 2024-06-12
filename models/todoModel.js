import mongoose from "mongoose";
import { dateRegex } from "./regex.js";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title"],
      trim: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["Without priority", "Low", "Medium", "High"],
      default: "Without priority",
    },
    deadline: {
      type: String,
      required: true,
      default: () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
      match: dateRegex,
    },

    ownerColumn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "column",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Todo", todoSchema);
