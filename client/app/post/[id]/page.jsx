"use client";
import Share from "@/app/components/Share";
import { getPostById, toggleLike } from "@/app/redux/actions/post";
import useAuthenticated from "@/hooks/useAuthenticated";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LinkedInPost = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const { isAuthenticated } = useAuthenticated();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [localData, setLocalData] = useState("");
  const postData = useSelector((state) => state.post.singlePost);
  const loading = useSelector((state) => state.post.loading);
  // const baseUrl = window.location.href;
  useEffect(() => {
    if (id) dispatch(getPostById(id));
  }, [id]);
  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("profile")));
  }, []);
  const user = postData?.user;
  const handleLike = (id, userId) => {
    if (isAuthenticated) {
      const isAlreadyLiked = likedPosts.has(id);

      if (isAlreadyLiked) {
        // If the post is already liked, remove it from the set
        setLikedPosts((prev) => {
          const updated = new Set(prev);
          updated.delete(id);
          return updated;
        });
      } else {
        // If the post is not liked yet, add it to the set
        setLikedPosts((prev) => new Set(prev).add(id));
      }

      // Dispatch the like/unlike action to the store

      dispatch(toggleLike(id, userId));
    } else {
      router.push("/auth");
      toast.error("Please Login to like the post");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {!postData ? (
        <div className="p-6 text-center text-gray-500 w-full h-screen ">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Post Header */}
          <div className="flex items-center p-4 border-b">
            <img
              src={user?.profileImage || "/default-profile.png"}
              alt={user?.firstName}
              className="w-12 h-12 rounded-full mr-3 object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {user?.firstName} {user?.surname}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-1">{user?.bio}</p>
              <span className="text-xs text-gray-400">
                {new Date(postData.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{postData?.title}</h2>
            <p className="text-gray-800 mb-4">{postData?.content}</p>
            {postData?.image && (
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={postData.image}
                  alt="Post"
                  className="w-full max-h-[400px] object-contain"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* Engagement Bar */}
          <div className="flex px-4 py-2 border-t border-b gap-6">
            {/* Like Button */}
            <div className="active-icons">
              <div
                onClick={() => handleLike(id, localData?.result?._id)}
                className="text-center flex items-center justify-center"
              >
                {postData?.likes?.includes(localData?.result?._id) ||
                likedPosts?.has(postData?._id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="mt-2 mr-2 cursor-pointer "
                    viewBox="0 0 24 24"
                    style={{ fill: "red" }}
                  >
                    <path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="mt-2 mr-2 cursor-pointer "
                    viewBox="0 0 24 24"
                    style={{ fill: "gray" }}
                  >
                    <path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z" />
                  </svg>
                )}
                {postData?.likes?.length}
              </div>

              <div className="text-center flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="mt-2 mr-2 cursor-pointer "
                  viewBox="0 0 24 24"
                  style={{ fill: "gray" }}
                >
                  <path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"></path>
                </svg>
              </div>
              <div>
                <Share
                  title={postData?.title}
                  content={postData?.content}
                  url={`https://social-media-application-umber.vercel.app/post/${id}`}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LinkedInPost;
