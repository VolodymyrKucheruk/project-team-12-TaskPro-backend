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
        enum: [
        "blue",
        "red",
        "green",
        "black",         
      ],                     
    },
    deadline: {
      type: Date,
      default: Date.now,
    },
    // ownerColumn: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   // required: [true],
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Todo", todoSchema);