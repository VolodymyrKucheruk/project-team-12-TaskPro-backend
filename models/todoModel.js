import mongoose from "mongoose";


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
      type: Date,
      required: true,
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