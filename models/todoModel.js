import mongoose from "mongoose";


const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title"],
    },
    description: {
      type: String,
      // required: [true, "Description"],
    },
    priority: {
      type: String,
      enum: ["Without priority", "Low", "Medium", "High"],
    },
    deadline: {
      type: Date,
      default: Date.now,
    },
    // містить ідентифікатор column в якій створюється ця картка
    ownerColumn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "column",
      // required: [true],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Todo", todoSchema);