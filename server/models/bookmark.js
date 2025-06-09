import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require:true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    require:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const bookmark = mongoose.model("bookmark", bookmarkSchema);
