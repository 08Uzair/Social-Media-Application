"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import cat from "../../public/assets/cat.jpg";
import plus from "../../public/assets/plus.png";
import cover from "../../public/assets/coverBg.jpg";
import dummy from "../../public/assets/dummy.png";
import { uploadImageToCloudinary } from "../utility/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByID,
  mergeAndUpdateLocalUserData,
  updateUser,
} from "../redux/actions/auth";
import { createPost, getUserPost } from "../redux/actions/post";

const ProfileCard = () => {
  const [activeTab, setActiveTab] = useState("Posts");
  const [localData, setLocalData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModelOpen, setModelOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [profileData, setProfileData] = useState({
    coverImage: "",
    profileImage: "",
    bio: "",
  });
  const dispatch = useDispatch();
  const mainUser = useSelector((state) => state?.auth?.[0]);
  console.log(mainUser?.followers?.length, "This is main User");
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    setLocalData(storedProfile);
  }, []);

  useEffect(() => {
    if (localData?.result?._id) {
      dispatch(getUserPost(localData.result._id));
      dispatch(getUserByID(localData.result._id));
    }
  }, [localData]);

  const postData = useSelector((state) => state?.post?.post);
  const posts = Array.isArray(postData) ? postData : [];
  // console.log(postData);
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await uploadImageToCloudinary(file);
      setImage(data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      user: localData?.result?._id,
      image,
      title,
      content,
    };
    dispatch(createPost(data));
    setImage("");
    setTitle("");
    setContent("");
    setModelOpen(false);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser(localData?.result?._id, profileData));
      mergeAndUpdateLocalUserData(profileData);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadImageToCloudinary(file);
      setProfileData({ ...profileData, [type]: imageUrl });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden mt-10">
      {/* Create Post Modal */}
      {isModelOpen && (
        <div className="w-full h-[100vh] backdrop-blur-md z-50 flex items-center justify-center flex-col fixed right-6">
          <div className="max-w-lg mx-auto bg-gray-100 p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create Post</h2>
            <div className="mb-4">
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="mb-2 w-full rounded-md"
                />
              )}
              <input
                type="file"
                onChange={handleImage}
                className="block w-full border-2 border-gray-400 p-2 rounded-2xl cursor-pointer"
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
                onClick={() => setModelOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cover Photo */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={
            profileData?.coverImage || localData?.result?.coverImage || cover
          }
          alt="Cover"
          className="h-full w-full object-cover"
          width={500}
          height={500}
        />
      </div>

      {/* Profile Image and Info */}
      <div className="p-6">
        <div className="flex items-center">
          <div className="relative -mt-16">
            <Image
              src={
                profileData?.profileImage ||
                localData?.result?.profileImage ||
                dummy
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-lg"
              width={300}
              height={300}
            />
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold">
              {localData?.result?.firstName} {localData?.result?.surname}
            </h2>
            <p className="text-gray-600">
              <span className="font-semibold">
                {mainUser?.followers?.length}
              </span>{" "}
              followers •{" "}
              <span className="font-semibold">
                {mainUser?.following?.length}
              </span>{" "}
              following
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer">
            Add to story
          </button>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-gray-200 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
          >
            Update Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-around border-b mt-6 text-lg text-gray-600">
          {["Posts", "Bio", "Videos"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                  : "hover:text-blue-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4 text-gray-700">
          {activeTab === "Posts" && (
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div
                onClick={() => setModelOpen(true)}
                className="w-[238px] h-[20vh] rounded-lg overflow-hidden content-center bg-center bg-no-repeat bg-cover"
              >
                <Image
                  width={700}
                  height={300}
                  src={plus}
                  alt="photo"
                  className="w-full cursor-pointer"
                />
              </div>
              {posts?.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className=" w-[238px] h-[20vh] overflow-hidden content-center bg-center bg-no-repeat bg-cover border border-gray-300"
                    >
                      <Image
                        width={700}
                        height={800}
                        src={image || item?.image}
                        alt="photo"
                        className=" w-full"
                      />
                    </div>
                  </>
                );
              })}
            </div>
          )}
          {activeTab === "Bio" && (
            <p>{profileData?.bio || localData?.result?.bio}</p>
          )}
          {activeTab === "Videos" && (
            <p>
              🎥 Uploaded a new travel vlog - "Sunset at the Beach" - 12K views
            </p>
          )}
        </div>
      </div>

      {/* Update Profile Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <label className="block text-gray-700">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "coverImage")}
              className="w-full rounded-2xl border p-2 mb-2"
            />
            <label className="block text-gray-700">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "profileImage")}
              className="w-full rounded-2xl border p-2 mb-2"
            />
            <label className="block text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              className="w-full border rounded-xl p-2 mb-4 h-20"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleUpdateProfile}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
