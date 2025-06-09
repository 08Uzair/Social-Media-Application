import expresss from "express";
import {
  addStory,
  deleteStory,
  getStory,
  getStoryById,
} from "../controllers/story.js";

export const storyRouter = expresss.Router();

storyRouter.post("/", addStory);
storyRouter.get("/", getStory);
storyRouter.get("/:id", getStoryById);
storyRouter.delete("/:id", deleteStory);
