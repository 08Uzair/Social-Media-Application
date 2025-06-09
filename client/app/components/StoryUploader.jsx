import React from "react";

const StoryUploader = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    const newStory = {
      userId: 1, // replace with auth userId
      userName: "You",
      avatar: "https://i.pravatar.cc/150?img=3",
      stories: urls,
    };
    onUpload(newStory);
  };

  return (
    <label htmlFor="upload" className="cursor-pointer">
      <input type="file" multiple className="hidden" id="upload" onChange={handleFileChange} />
      <div className="flex flex-col items-center gap-1">
        <div className="w-16 h-16 bg-blue-500 rounded-full text-white text-2xl flex items-center justify-center">
          +
        </div>
        <p>Post Story</p>
      </div>
    </label>
  );
};

export default StoryUploader;
