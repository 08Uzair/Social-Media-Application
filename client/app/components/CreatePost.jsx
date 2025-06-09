"use client"
import { useState } from "react";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  const data ={
    image:image,
    title:title,
    content:content
  }
  console.log(data)
  };

  return (
    <div className="w-[100%] h-[100vh]  z-50 flex items-center justify-center flex-col fixed right-6">
      <div className="max-w-lg mx-auto bg-gray-100 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create Post</h2>

        <div className="mb-4">
          {image && (
            <img src={image} alt="Preview" className="mb-2 w-full rounded-md" />
          )}
          <input
            type="file"
            onChange={handleImageUpload}
            className="block w-full"
          />
        </div>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md focus:ring focus:ring-blue-200"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md focus:ring focus:ring-blue-200"
        />

        <div className="flex justify-end gap-2">
          <button
            // onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
