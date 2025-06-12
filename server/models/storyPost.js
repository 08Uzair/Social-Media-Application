import mongoose from "mongoose";

const storyPostSchema = new mongoose.Schema({
  media: {
    type: [String],
    required: true

  },
  seen: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const storyPost = mongoose.model("storyPost", storyPostSchema);
