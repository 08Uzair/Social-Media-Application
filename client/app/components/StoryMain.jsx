"use client";
import React, { useEffect, useState } from "react";
import { uploadToCloudArray } from "../utility/upoadToCloudArray";
import { useDispatch, useSelector } from "react-redux";
import { addStory, getStory } from "../redux/actions/story";
import useLocalStorage from "@/hooks/useLocalStorage";

const StoryFeature = () => {
  const dispatch = useDispatch();
  const [profile] = useLocalStorage("profile", null);

  // ✅ Correctly access the array from Redux state
  const stories = useSelector((state) => state.story.story.stories);
console.log(stories, "stories from redux");
  const [usersStories, setUsersStories] = useState([]);
  const [viewingIndex, setViewingIndex] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Fetch stories on mount
  useEffect(() => {
    dispatch(getStory());
  }, [dispatch]);

  // Group stories by user
  useEffect(() => {
    if (!Array.isArray(stories) || stories.length === 0) return;

    const grouped = stories.reduce((acc, item) => {
      const existing = acc.find((u) => u.userId === item.user._id);
      if (existing) {
        existing.stories.push(...item.story);
      } else {
        acc.push({
          userId: item.user._id,
          userName: `${item.user.firstName} ${item.user.surname}`,
          avatar: item.user.profileImage,
          stories: [...item.story],
        });
      }
      return acc;
    }, []);

    setUsersStories(grouped);
  }, [stories]);

  // Upload story
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    const urls = await uploadToCloudArray(files);
    if (urls.length === 0) return;

    const newStory = {
      user: profile?.result?._id,
      story: urls,
    };

    await dispatch(addStory(newStory));

    setUsersStories((prev) => {
      const existing = prev.find((u) => u.userId === newStory.user);
      if (existing) {
        return prev.map((user) =>
          user.userId === newStory.user
            ? { ...user, stories: [...user.stories, ...urls] }
            : user
        );
      } else {
        return [
          ...prev,
          {
            userId: newStory.user,
            userName: `${profile?.result?.firstName} ${profile?.result?.surname}`,
            avatar: profile?.result?.profileImage,
            stories: urls,
          },
        ];
      }
    });
  };

  const handleStoryClick = (index) => {
    setViewingIndex(index);
    setCurrentIdx(0);
  };

  // Auto-play story
  useEffect(() => {
    if (viewingIndex === null) return;

    const total = usersStories[viewingIndex]?.stories.length || 0;
    const timer = setTimeout(() => {
      if (currentIdx < total - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        setViewingIndex(null);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIdx, viewingIndex, usersStories]);

  const handleViewerClick = (e) => {
    const width = window.innerWidth;
    const x = e.clientX;
    const total = usersStories[viewingIndex]?.stories.length || 0;

    if (x < width / 2) {
      if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
    } else {
      if (currentIdx < total - 1) setCurrentIdx((prev) => prev + 1);
      else setViewingIndex(null);
    }
  };

  return (
    <div className="p-4 flex items-center justify-center gap-2">
      {/* Upload Story */}
      <label htmlFor="upload" className="cursor-pointer">
        <input
          type="file"
          multiple
          className="hidden"
          id="upload"
          onChange={handleUpload}
        />
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full text-white text-2xl flex items-center justify-center">
            +
          </div>
          <p>Post Story</p>
        </div>
      </label>

      {/* Avatars */}
      <div className="flex gap-4 overflow-x-auto">
        {usersStories.map((user, idx) => (
          <div
            key={user.userId}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleStoryClick(idx)}
          >
            <img
              src={user.avatar}
              alt={user.userName}
              className="w-16 h-16 rounded-full border-2 border-blue-500"
            />
            <p className="text-sm text-center mt-1">{user.userName}</p>
          </div>
        ))}
      </div>

      {/* Viewer */}
      {viewingIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
          onClick={handleViewerClick}
        >
          {/* Progress bars */}
          <div className="flex w-full max-w-md gap-1 p-4">
            {usersStories[viewingIndex]?.stories.map((_, i) => (
              <div key={i} className="relative flex-1 h-1 bg-white/30 rounded">
                <div
                  className={`absolute top-0 left-0 h-full rounded transition-all duration-[3000ms] ease-linear ${
                    i < currentIdx
                      ? "w-full bg-white"
                      : i === currentIdx
                      ? "w-full bg-white animate-[progress_3s_linear]"
                      : "w-0 bg-white"
                  }`}
                ></div>
              </div>
            ))}
          </div>

          {/* Story image */}
          <img
            src={usersStories[viewingIndex].stories[currentIdx]}
            alt={`story-${currentIdx}`}
            className="w-80 h-96 object-cover rounded-lg shadow-lg"
          />

          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewingIndex(null);
            }}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default StoryFeature;
