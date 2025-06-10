import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  likes: {
    type: [String],
    default: [],
  },
  isBookMark: {
    type: Boolean,
    default: false,
  },
  comments: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const post = mongoose.model("post", postSchema);
