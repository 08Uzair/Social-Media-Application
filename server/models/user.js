import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  bio: {
    type: String,
  },
  followers: {
    type: [String],
  },
  following: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const user = mongoose.model("user", userSchema);
