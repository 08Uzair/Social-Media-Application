import { Story } from "../models/story.js";

// Create or Update Story
export const addStory = async (req, res) => {
  const { story, user } = req.body;

  try {
    // Check if story already exists for this user
    const existingStory = await Story.findOne({ "user._id": user._id });

    if (existingStory) {
      // Append new stories to existing array
      existingStory.story.push(...story);
      existingStory.createdAt = new Date().toISOString(); // optional: update timestamp
      await existingStory.save();
      return res.status(200).json({ message: "Story updated successfully" });
    }

    // Create new story entry
    const saveData = new Story({
      story,
      user,
      createdAt: new Date().toISOString(),
    });

    await saveData.save();
    res.status(201).json({ message: "Story added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

//Get Story
export const getStory = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 }).populate("user");
    res.status(200).json({ stories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

// Get Story by Id
export const getStoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const stories = await Story.findById(id).populate("user");
    if (!stories) {
      return res.status(404).json({ message: "Story Not Found" });
    }
    res.status(200).json(stories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Story

export const deleteStory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStory = await Story.findByIdAndDelete(id);
    if (!deletedStory) {
      return res.status(404).json({ message: "Story Not Found" });
    }
    res.status(200).json({ message: "Story Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
