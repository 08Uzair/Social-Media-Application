import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  story: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "storyPost",
      required: true,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export const Story = mongoose.model("Story", storySchema);
