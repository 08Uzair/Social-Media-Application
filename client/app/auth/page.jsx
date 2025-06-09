"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signin, signUp } from "../redux/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const FacebookAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  // State for Sign Up Data
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    day: "",
    month: "",
    year: "",
    gender: "",
  });
  console.log(signUpData, "SIGNUP DATA");

  const handleSignUp =async (e) => {
    setIsButton(true);
    e.preventDefault();
    if (signUpData) {
      dispatch(signUp(signUpData));
    }
   await router.push("/");
    toast.success("Registered Successfully");
  };

  // State for Sign In Data
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const handleSignIn =async (e) => {
    setIsButton(true);
    e.preventDefault();
    if (signInData) {
      dispatch(signin(signInData));
    }
    toast.success("Login Sucessfully");
   await router.push("/");
  
  };

  // Handle Sign Up Change
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Sign In Change
  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100 p-4">
      {/* Left Section */}
      <div className="text-center md:text-left md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-5xl font-bold text-blue-600">Socialbook</h1>
        <p className="mt-4 text-gray-700 text-lg">
          Socialbook helps you connect and share with the people in your life.
        </p>
      </div>

      {/* Right Section (Conditional Rendering) */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-96">
        {isSignUp ? (
          // Sign Up Form
          <>
            <h2 className="text-xl font-semibold text-center cursor-pointer">
              Create a new account
            </h2>
            <p className="text-center text-gray-500 mb-4">
              It's quick and easy.
            </p>

            <div className="flex space-x-2">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="w-1/2 p-2 border rounded-md"
                value={signUpData.firstName}
                onChange={handleSignUpChange}
              />
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                className="w-1/2 p-2 border rounded-md"
                value={signUpData.surname}
                onChange={handleSignUpChange}
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mt-2 border rounded-md"
              value={signUpData.email}
              onChange={handleSignUpChange}
            />
            <input
              type="password"
              name="password"
              placeholder="New password"
              className="w-full p-2 mt-2 border rounded-md"
              value={signUpData.password}
              onChange={handleSignUpChange}
            />

            {/* Date of Birth */}
            <div className="mt-2 flex space-x-2">
              <select
                name="day"
                className="w-1/3 p-2 border rounded-md"
                value={signUpData.day}
                onChange={handleSignUpChange}
              >
                <option>Day</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="month"
                className="w-1/3 p-2 border rounded-md"
                value={signUpData.month}
                onChange={handleSignUpChange}
              >
                <option>Month</option>
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                name="year"
                className="w-1/3 p-2 border rounded-md"
                value={signUpData.year}
                onChange={handleSignUpChange}
              >
                <option>Year</option>
                {[...Array(100)].map((_, i) => (
                  <option key={i} value={2025 - i}>
                    {2025 - i}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Selection */}
            <div className="mt-2 flex space-x-4">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={signUpData.gender === "Female"}
                  onChange={handleSignUpChange}
                />{" "}
                <span>Female</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={signUpData.gender === "Male"}
                  onChange={handleSignUpChange}
                />{" "}
                <span>Male</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="gender"
                  value="Custom"
                  checked={signUpData.gender === "Custom"}
                  onChange={handleSignUpChange}
                />{" "}
                <span>Custom</span>
              </label>
            </div>

            <button
              onClick={handleSignUp}
              className="w-full bg-green-500 text-white p-3 rounded-md mt-4 hover:bg-green-600 cursor-pointer"
            >
              {isButton ? "Registering..." : " Sign Up"}
            </button>
            <p
              className="text-center text-blue-500 mt-3 cursor-pointer hover:underline"
              onClick={() => setIsSignUp(false)}
            >
              Already have an account?
            </p>
          </>
        ) : (
          // Login Form
          <>
            <input
              type="text"
              name="email"
              placeholder="Email address or phone number"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={signInData.email}
              onChange={handleSignInChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 mt-3 border border-gray-300 rounded-md"
              value={signInData.password}
              onChange={handleSignInChange}
            />

            <button
              onClick={handleSignIn}
              className="w-full bg-blue-600 text-white p-3 rounded-md mt-4 hover:bg-blue-700 cursor-pointer"
            >
              {isButton ? "Loging in...." : "  Log in"}
            </button>
            <p className="text-center text-blue-500 mt-3 cursor-pointer hover:underline">
              Forgotten password?
            </p>
            <hr className="my-4" />
            <button
              className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 cursor-pointer"
              onClick={() => setIsSignUp(true)}
            >
              Create new account
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FacebookAuth;
