import expresss from "express";
import {
  addUserStory,
  deleteStory,
  getStory,
  getStoryById,
} from "../controllers/story.js";

export const storyRouter = expresss.Router();

storyRouter.post("/", addUserStory);
storyRouter.get("/", getStory);
storyRouter.get("/:id", getStoryById);
storyRouter.delete("/:id", deleteStory);
