"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookMark,
  getUserBookMark,
  removeBookMark,
} from "../redux/actions/bookMark";
import dummy from "../../public/assets/dummy.png";
import add from "../../public/assets/advertisement.png";
import Image from "next/image";
import FormattedDate from "../utility/formattedDate";
import { getPostById } from "../redux/actions/post";

const BookMarkPage = () => {
  const [localData, setLocalData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const bookmark = useSelector((state) => state?.post?.singlePost);
  console.log(bookmark, "This is Single Bookmark");
  // console.log(filteredData, "This is Filtered Bookmark");
  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("profile")));
    dispatch(getBookMark()); // Dispatch the getBookMark to fetch all bookmarks
  }, []);

  const callFilter = async () => {
    if (localData?.result?._id) {
      const result = await dispatch(getUserBookMark(localData?.result?._id));
      setFilteredData(result); // Set filtered data once the promise resolves
    }
  };

  useEffect(() => {
    if (localData?.result?._id) {
      callFilter(); // Call filter after localData is set
    }
    console.log(localData?.result?._id, "This is userId");
  }, [localData]);

  const handleRemoveBookMark = (id) => {
    const deletedData = filteredData.filter((item) => item._id !== id);
    setFilteredData(deletedData);
    dispatch(removeBookMark(id));
  };

  const openModal = (id) => {
    setIsModalOpen(true);
    dispatch(getPostById(id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Main Feed */}
      <main className="w-[55%] sm:w-[85%] space-y-4">
        <div className="bg-white p-4 rounded-xl shadow text-center relative flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-bold">BOOKMARKS 🧾</h1>
          <span className="w-8 h-8 rounded-full shadow absolute right-8 flex items-center justify-center text-center">{filteredData.length}</span>
        </div>

        {/* Posts */}
        {filteredData?.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow space-y-2 cursor-pointer"
          >
            <div className="flex items-center gap-3 relative">
              <div
                onClick={() => handleRemoveBookMark(item._id)}
                className="absolute right-0 cursor-pointer mt-[2rem]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ fill: "gray" }}
                >
                  <path d="M18.5 2h-12C4.57 2 3 3.57 3 5.5V22l7-3.5 7 3.5v-9h5V5.5C22 3.57 20.43 2 18.5 2zM15 18.764l-5-2.5-5 2.5V5.5C5 4.673 5.673 4 6.5 4h8.852A3.451 3.451 0 0 0 15 5.5v13.264zM20 11h-3V5.5c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5V11z"></path>
                  <path d="M7 9h6v2H7z"></path>
                </svg>
              </div>
            </div>
            <div onClick={() => openModal(item?.post._id)}>
              <p className="font-semibold text-lg text-gray-800">
                {item?.post?.title}
              </p>
              <div className="text-xs text-gray-500">
                <FormattedDate dateString={item?.createdAt} />
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 w-[100%] h-[100vh] backdrop-blur-md  flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[500px]">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                  }}
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <Image
                src={bookmark?.image || add}
                alt="Bookmark Image"
                className="w-full h-68   "
                width={400}
                height={300}
              />
              <h2 className="text-xl font-bold mt-4">{bookmark.title}</h2>
              <p className="text-sm font-semibold mt-2">
                Content : {bookmark.content}
              </p>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  User: {bookmark?.user?.firstName} {""}{" "}
                  {bookmark?.user?.surname}
                </p>
                <p>Email: {bookmark?.user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookMarkPage;
