"use client";
import React, { useState } from "react";

const LinkedInPost = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(24);

  const handleLike = () => {
    setLiked(!liked);
    setNumLikes(liked ? numLikes - 1 : numLikes + 1);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), text: commentText, author: "You" },
      ]);
      setCommentText("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-6">
      {/* Post Header */}
      <div className="flex items-center p-4 border-b">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Author"
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold text-gray-900">John Doe</h3>
          <p className="text-sm text-gray-500">Software Engineer at TechCorp</p>
          <span className="text-xs text-gray-400">2h ago</span>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-800 mb-4">
          Excited to share that we’ve just launched a new feature for our
          product! Looking forward to all the feedback. 🚀
        </p>
        <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img
            src="https://via.placeholder.com/600x400/cccccc/ffffff?text=Product+Launch"
            alt="Post"
            className="w-full"
          />
        </div>
      </div>

      {/* Engagement Bar */}
      <div className="flex justify-between px-4 py-2 border-t border-b">
        <button
          className={`flex items-center text-gray-500 hover:text-blue-600 ${
            liked ? "text-blue-600" : ""
          }`}
          onClick={handleLike}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          Like {numLikes > 0 && <span>{numLikes}</span>}
        </button>
        <button className="flex items-center text-gray-500 hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Comment
        </button>
        <button className="flex items-center text-gray-500 hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share
        </button>
        <button className="flex items-center text-gray-500 hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>

      {/* Comments Section */}
      <div className="p-4">
        <form onSubmit={handleComment} className="flex mb-4">
          <img
            src="https://randomuser.me/api/portraits/women/1.jpg"
            alt="You"
            className="w-8 h-8 rounded-full mr-2"
          />
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {comments.map((comment) => (
          <div key={comment.id} className="flex mb-3">
            <img
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt="You"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="bg-gray-100 rounded-lg px-3 py-2">
              <p className="font-semibold text-sm">{comment.author}</p>
              <p className="text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkedInPost;
