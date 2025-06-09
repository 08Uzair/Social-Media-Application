import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require:true
  },
  story: {
    type: [String],
    require:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Story = mongoose.model("Story", storySchema);
