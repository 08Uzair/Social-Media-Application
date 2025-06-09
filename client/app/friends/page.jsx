"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersByIds,
  // getFollowersByIds,
  getUserByID,
} from "../redux/actions/auth";

const FollowTabs = () => {
  const [activeTab, setActiveTab] = useState("followers");
  const dispatch = useDispatch();
  const [localData, setLocalData] = useState();
  const [followers, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);

  const mainUser = useSelector((state) => state?.auth?.[0]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = JSON.parse(localStorage.getItem("profile"));
      setLocalData(storedData);
    }
    //  const token = req.cookies.get('token')?.value;
    //  console.log(token, "This is TOKEN From Cookies")
  }, []);
  // const followersData = async () => {
  //   if (mainUser?.followers?.length) {
  //     const data = await getAllUsersByIds(mainUser.followers, dispatch);
  //     // console.log(data, "These are followers");
  //     if (data) {
  //       setFollower(data);
  //     }
  //   }
  // };

  const followingData = async () => {
    if (mainUser?.following?.length) {
      const data = await getAllUsersByIds(mainUser.following, dispatch);
      if (data) {
        setFollowing(data);
      }
    }
  };

  useEffect(() => {
    if (localData?.result?._id) {
      dispatch(getUserByID(localData.result._id));
      // dispatch(getUserByID(localData.result._id))
      console.log(localData.result._id);
    }
  }, [localData?.result?._id]);

  useEffect(() => {
    if (mainUser) {
      // followersData();
      followingData();
    }
  }, [mainUser]);

  return (
    <div className=" m-[2rem] mt-10 p-4 bg-white rounded-2xl shadow-lg">
      {/* Tabs */}
      <div className="flex justify-between border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab("followers")}
          className={`flex-1 py-2 text-center font-semibold cursor-pointer ${
            activeTab === "followers"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 "
          }`}
        >
          Followers - {followers?.length}
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`flex-1 py-2 text-center font-semibold cursor-pointer ${
            activeTab === "following"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Following - {following?.length}
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {(activeTab === "followers" ? followers : following).map((user) => (
          <div
            key={user?.id}
            className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            <img
              src={user?.profileImage}
              alt={user?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">
                {user?.firstName} {user?.surname}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowTabs;
