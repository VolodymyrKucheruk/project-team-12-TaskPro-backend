import mongoose from "mongoose";


const columnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title"],
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

export default mongoose.model("Column", columnSchema);