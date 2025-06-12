"use client";
import React, { useState, useEffect } from "react";
import logo from "../../public/assets/logo.png";
import search from "../../public/assets/search.png";
import avatar from "../../public/assets/dummy.png";
import feedback from "../../public/assets/feedback.png";
import friends from "../../public/assets/friends.png";
import marketplace from "../../public/assets/marketplace.png";
import logout from "../../public/assets/logout.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/auth";
// import bookmark from "../redux/reducers/bookmark";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [localData, setLocalData] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  // Toggle settings menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  let isAuthenticated;

  if (localData === null) {
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }

  // Close menu when clicking outside
  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("profile")));

    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".settings-menu") &&
        !event.target.closest(".nav-user-icon")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleRoute = (path) => {
    router.push(`/${path}`);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    // router.push("/auth");
    window.location.reload();
  };
  const handleProfile = (e) => {
    e.preventDefault();

    router.push("/profile");
  };
  return (
    <>
      <nav>
        <div className="nav-left">
          <Link href={"/"}>
            <Image src={logo} className="logo" alt="Logo" />
          </Link>
        </div>

        <div className="nav-right">
          <div className="search-box">
            <Image src={search} alt="Search Icon" />
            <input type="text" placeholder="Search" />
          </div>

          {/* Avatar Icon for Toggle */}
          <div className="nav-user-icon online" onClick={toggleMenu}>
            <Image
              src={localData?.result?.profileImage || avatar}
              width={200}
              height={200}
              alt="Profile"
            />
          </div>
        </div>

        {/* Settings Menu */}
        <div className={`settings-menu ${menuOpen ? "active" : ""}`}>
          <div className="setting-menu-inner">
            <div onClick={handleProfile} className="user-profile">
              <Image
                src={localData?.result?.profileImage || avatar}
                width={200}
                height={200}
                alt="Profile"
              />
              <div>
                <p>
                  {" "}
                  {localData?.result?.firstName} {localData?.result?.surname}
                </p>
                <span className="text-blue-500 cursor-pointer hover:underline ">
                  See Your Profile
                </span>
              </div>
            </div>
            <hr />

            <div className="user-profile">
              <Image src={feedback} alt="Feedback" />
              <div>
                <p>Give Feedback</p>
                <a href="#">Help us improve the new design</a>
              </div>
            </div>
            <hr />

            <div
              onClick={() => handleRoute("friends")}
              className="seeting-links"
            >
              <Image
                src={friends}
                className="settings-icon grayscale"
                alt="Settings"
              />
              <span>Friends</span>
            </div>
            <div
              onClick={() => handleRoute("bookmark")}
              className="seeting-links"
            >
              <Image
                src={marketplace}
                className="settings-icon grayscale"
                alt="Help"
              />
              <span>BookMarks</span>
            </div>
            {!isAuthenticated ? (
              <>
                <div
                  onClick={() => handleRoute("auth")}
                  className="seeting-links "
                >
                  <Image
                    src={logout}
                    className="settings-icon grayscale"
                    alt="Logout"
                  />
                  <span className="text-gray-600">SignIn</span>
                </div>
              </>
            ) : (
              <>
                <div className="seeting-links cursor-pointer">
                  <Image src={logout} className="settings-icon1" alt="Logout" />

                  <span onClick={handleLogout}>Logout</span>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
