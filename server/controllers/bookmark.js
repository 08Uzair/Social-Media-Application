import { bookmark } from "../models/bookmark.js";

// Create Book Mark
export const addMark = async (req, res) => {
  const { post, user } = req.body;
  const saveData = new bookmark({
    post,
    user,
    createdAt: new Date().toISOString(),
  });
  try {
    await saveData.save();
    res.status(200).json({ message: "BookMark Added Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

//Get Book Mark
export const getMark = async (req, res) => {
  try {
    const marks = await bookmark
      .find()
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("post");
    res.status(200).json({ marks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

// Get Book Mark by Id
export const getMarkById = async (req, res) => {
  const { id } = req.params;
  try {
    const marks = await bookmark.findById(id).populate("user").populate("post");
    if (!marks) {
      return res.status(404).json({ message: "BookMark Not Found" });
    }
    res.status(200).json(marks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Book Mark

export const deleteMark = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMark = await bookmark.findByIdAndDelete(id);
    if (!deletedMark) {
      return res.status(404).json({ message: "Book Mark Not Found" });
    }
    res.status(200).json({ message: "Book Mark Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
