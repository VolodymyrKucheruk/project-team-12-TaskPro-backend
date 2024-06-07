import mongoose from "mongoose";


const columnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title"],
      // enum: [
      //   "To Do",
      //   "In progress",
      //   "Done",                  
      // ],       
    },     
    ownerDashboard: { 
      type: mongoose.Schema.Types.ObjectId,     
      ref: "dashboard",
      // required: [true],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Column", columnSchema);