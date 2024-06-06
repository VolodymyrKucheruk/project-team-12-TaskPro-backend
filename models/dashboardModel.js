import mongoose from "mongoose";


const dashboardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title"],
    },
    icons: {
        type: String,
        // required: [true, "Description"],
    //     enum: [
    //     "blue",
    //     "red",
    //     "green",
    //     "black",         
    //   ],       
    },
    background: {
        type: String,
    //     enum: [
    //     "blue",
    //     "red",
    //     "green",
    //     "black",         
    //   ],                     
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

export default mongoose.model("Dashboard", dashboardSchema);