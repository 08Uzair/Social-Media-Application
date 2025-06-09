import { post } from "../models/post.js";

// Create Post
export const addPost = async (req, res) => {
  // const user = req.userId;
  const { user, title, image, content } = req.body;
  const saveData = new post({
    user,
    title,
    image,
    content,
    isBookMark: false,
    createdAt: new Date().toISOString(),
  });
  try {
    await saveData.save();
    res.status(200).json({ message: "Added Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

//Get Post
export const getPost = async (req, res) => {
  try {
    const posts = await post.find().sort({ createdAt: -1 }).populate("user");
    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

// Get Post by Id
export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await post.findById(id).populate("user");
    if (!posts) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  //   const user = req.userId;
  const { title, image, content, isBookMark, likes } =
    req.body;
  try {
    const updatedata = {
      title,
      image,
      content,
      isBookMark,
      likes,
    
    };
    const updatedPost = await post.findByIdAndUpdate(id, updatedata, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ result: updatedPost, message: "Added Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Search Post
// export const searchPost = async (req, res) => {
//   const searchTerm = req.query.q; // Assuming 'q' as the search parameter
//   try {
//     const results = await post.find({
//       $or: [
//         { title: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for title
//         { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for name
//         { content: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for content
//       ],
//     });

//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Like Post

// export const toggleLikePost = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const userId = req.user.id; // Assuming you're using some auth middleware that attaches `req.user`

//     const foundPost = await post.findById(postId);
//     if (!foundPost) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     const isLiked = foundPost.likes.includes(userId);

//     if (isLiked) {
//       // Remove user ID (unlike)
//       foundPost.likes = foundPost.likes.filter((id) => id !== userId);
//     } else {
//       // Add user ID (like)
//       foundPost.likes.push(userId);
//     }

//     await foundPost.save();

//     return res.status(200).json({
//       message: isLiked ? "Post unliked" : "Post liked",
//       likes: foundPost.likes,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };
