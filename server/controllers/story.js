import { Story } from "../models/story.js";
import { storyPost } from "../models/storyPost.js";

// POST /story
export const addUserStory = async (req, res) => {
  const { user, media } = req.body;
console.log("Received request to add user story:", { user, media });
  if (!user || !media) {
    return res.status(400).json({ message: "User and media are required." });
  }

  try {
    const userId = user._id || user;

    // Step 1: Create a new story post
    const newStoryPost = new storyPost({ media });
    await newStoryPost.save();

    // Step 2: Find if user already has a Story document
    let existingStory = await Story.findOne({ user: userId });

    if (existingStory) {
      // Add the new storyPost ID
      existingStory.story.push(newStoryPost._id);
      existingStory.createdAt = new Date();
      await existingStory.save();

      return res.status(200).json({
        message: "Story updated successfully",
        storyId: existingStory._id,
        addedPost: newStoryPost
      });
    } else {
      // Create a new Story document
      const newStory = new Story({
        user: userId,
        story: [newStoryPost._id],
      });
      await newStory.save();

      return res.status(201).json({
        message: "Story created successfully",
        storyId: newStory._id,
        addedPost: newStoryPost
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};


//Get Story
export const getStory = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 }).populate("user").populate('story');
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



export const cleanupOldStories = async () => {
  try {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hrs ago

    const expiredPosts = await storyPost.find({ createdAt: { $lt: cutoff } });
    const expiredPostIds = expiredPosts.map((p) => p._id);

    if (expiredPostIds.length > 0) {
      await storyPost.deleteMany({ _id: { $in: expiredPostIds } });

      await Story.updateMany(
        { story: { $in: expiredPostIds } },
        { $pull: { story: { $in: expiredPostIds } } }
      );

      await Story.deleteMany({ story: { $size: 0 } });

      console.log(`[CRON] Deleted ${expiredPostIds.length} expired stories.`);
    } else {
      console.log("[CRON] No expired stories found.");
    }
  } catch (err) {
    console.error("[CRON] Error during story cleanup:", err.message);
  }
};
