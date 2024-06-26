import mongoose from "mongoose";


const columnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ownerBoard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Column", columnSchema);