import { model, Schema } from "mongoose";

import { timeRegex, dateRegex } from "./regex.js";

const waterSchema = new Schema(
  {
    amountDose: {
      type: Number,
      required: [true, "Enter amount of water"],
    },
    timeDose: {
      type: String,
      required: [true, "Enter time please"],
      unique: true,
      match: timeRegex,
    },
    dateDose: {
      type: String,
      default: () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
      match: dateRegex,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export const Water = model("Water", waterSchema);
