"use client";
import React, { useEffect, useState } from "react";
import friends from "../../public/assets/friends.png";
import marketplace from "../../public/assets/marketplace.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthenticated from "@/hooks/useAuthenticated";
import avatar from "../../public/assets/dummy.png";
import cover from "../../public/assets/coverBg.jpg";
const LeftSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [localData, setLocalData] = useState(null);
  const navigate = useRouter();
  const { isAuthenticated } = useAuthenticated();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profile"));
    if (data) {
      setLocalData(data);
    }
  }, []);

  return (
    <>
      {/* Menu Button (Mobile) */}
      <button
        className="md:hidden fixed top-[4rem] left-4 text-white px-3 py-2 rounded-md z-50"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      <div
        className={`left-sidebar fixed md:static z-40 md:z-0 bg-white md:w-[300px] h-screen md:h-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-black"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        {/* Profile Card */}
        {isAuthenticated ? (
          <>
            <div className="w-full mx-auto bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden text-black">
              {/* Banner */}
              <div
                className="relative h-24 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${
                    localData?.result?.coverImage || cover
                  })`,
                }}
              >
                <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2">
                  <Image
                    src={localData?.result?.profileImage || avatar}
                    alt="Avatar"
                    className="rounded-full border-4 border-white shadow-lg"
                    width={80}
                    height={80}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="pt-12 px-4 pb-4 text-center">
                <Link href={"/profile"}>
                  <h2 className="text-xl font-semibold hover:underline cursor-pointer">
                    {localData?.result?.firstName} {localData?.result?.surname}
                  </h2>
                </Link>
                <p
                  className="text-sm text-gray-800 line-clamp-2
"
                >
                  {localData?.result?.bio}
                </p>
                {/* <p className="text-xs text-gray-500 mt-1">Pune, Maharashtra</p> */}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* Navigation Links */}
        <div className="w-full mx-auto bg-white border border-gray-300 rounded-xl shadow-lg text-black p-4 mt-4 space-y-3">
          <div className="imp-links space-y-2">
            <span
              onClick={() => navigate.push("/friends")}
              className="cursor-pointer flex items-center gap-2"
            >
              <Image src={friends} alt="Friends" width={24} height={24} />
              Friends
            </span>
            <span
              onClick={() => navigate.push("/bookmark")}
              className="cursor-pointer flex items-center gap-2"
            >
              <Image src={marketplace} alt="Bookmark" width={24} height={24} />
              BookMark
            </span>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default LeftSidebar;
