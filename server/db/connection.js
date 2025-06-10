import mongoose from "mongoose";

const URI =
  "mongodb+srv://social:social@cluster0.gy3sw7d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const dataBaseConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DATA BASE IS CONNECTED");
  } catch (error) {
    console.error("Mongoose connection error:", error);
  }
};
