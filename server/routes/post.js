import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPostById,
  // toggleLikePost,
  updatePost,
} from "../controllers/post.js";
// import auth from "../middleware/auth.js"
export const postRouter = express.Router();
postRouter.post("/", addPost);
postRouter.get("/", getPost);
postRouter.get("/:id", getPostById);
postRouter.delete("/:id", deletePost);
postRouter.put("/:id", updatePost);
// postRouter.put("/:id/like", likePost);
// router.put("/posts/:postId/like", toggleLikePost);
