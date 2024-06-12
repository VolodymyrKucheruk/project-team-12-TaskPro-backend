import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title"],
      trim: true,
    },
    icon: String,
    background: String,
    ownerUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Board", boardSchema, "dashboards");
