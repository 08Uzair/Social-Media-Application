"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signin, signUp } from "../redux/actions/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const FacebookAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [btnStage, setBtnStage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  // Button text stages
  const btnStages = ["Logging in...", "Just 5 sec", "You're almost there"];

  useEffect(() => {
    let timer;
    if (isSubmitting) {
      timer = setInterval(() => {
        setBtnStage((prev) => (prev + 1) % btnStages.length);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSubmitting]);

  // Password validation
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  // SignUp State
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

  // SignIn State
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  // Validation check
  const validateSignUpFields = () => {
    const newErrors = {};
    Object.entries(signUpData).forEach(([key, value]) => {
      if (!value) newErrors[key] = `${key} is required`;
    });

    if (signUpData.password && !validatePassword(signUpData.password)) {
      newErrors.password =
        "Password must be > 5 chars and include A-Z, symbol, and number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignInFields = () => {
    const newErrors = {};
    Object.entries(signInData).forEach(([key, value]) => {
      if (!value) newErrors[key] = `${key} is required`;
    });

    // if (signInData.password && !validatePassword(signInData.password)) {
    //   newErrors.password =
    //     "Password must be > 5 chars and include A-Z, symbol, and number";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateSignUpFields()) return;

    setIsSubmitting(true);
    await dispatch(signUp(signUpData));
    toast.success("Registered Successfully");
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateSignInFields()) return;

    setIsSubmitting(true);
    await dispatch(signin(signInData));
    toast.success("Login Successfully");
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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

      {/* Right Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-96">
        {isSignUp ? (
          <>
            <h2 className="text-xl font-semibold text-center">
              Create a new account
            </h2>
            <p className="text-center text-gray-500 mb-4">
              It's quick and easy.
            </p>

            <div className="flex space-x-2">
              <div className="w-1/2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  className="w-full p-2 border rounded-md"
                  value={signUpData.firstName}
                  onChange={handleSignUpChange}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  className="w-full p-2 border rounded-md"
                  value={signUpData.surname}
                  onChange={handleSignUpChange}
                />
                {errors.surname && (
                  <p className="text-red-500 text-xs">{errors.surname}</p>
                )}
              </div>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mt-2 border rounded-md"
              value={signUpData.email}
              onChange={handleSignUpChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="New password"
              className="w-full p-2 mt-2 border rounded-md"
              value={signUpData.password}
              onChange={handleSignUpChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}

            {/* DOB */}
            <div className="mt-2 flex space-x-2">
              {["day", "month", "year"].map((field, i) => (
                <select
                  key={field}
                  name={field}
                  className="w-1/3 p-2 border rounded-md"
                  value={signUpData[field]}
                  onChange={handleSignUpChange}
                >
                  <option>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </option>
                  {field === "day" &&
                    [...Array(31)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  {field === "month" &&
                    [
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
                  {field === "year" &&
                    [...Array(100)].map((_, i) => (
                      <option key={i} value={2025 - i}>
                        {2025 - i}
                      </option>
                    ))}
                </select>
              ))}
            </div>

            {/* Gender */}
            <div className="mt-2 flex space-x-4">
              {["Female", "Male", "Custom"].map((g) => (
                <label key={g} className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={signUpData.gender === g}
                    onChange={handleSignUpChange}
                  />
                  <span>{g}</span>
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender}</p>
            )}

            <button
              onClick={handleSignUp}
              className="w-full bg-green-500 text-white p-3 rounded-md mt-4 hover:bg-green-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? btnStages[btnStage] : "Sign Up"}
            </button>

            <p
              className="text-center text-blue-500 mt-3 cursor-pointer hover:underline"
              onClick={() => {
                setIsSignUp(false);
                setErrors({});
                setIsSubmitting(false);
              }}
            >
              Already have an account?
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              name="email"
              placeholder="Email address or phone number"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={signInData.email}
              onChange={handleSignInChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 mt-3 border border-gray-300 rounded-md"
              value={signInData.password}
              onChange={handleSignInChange}
            />
            {/* {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )} */}

            <button
              onClick={handleSignIn}
              className="w-full bg-blue-600 text-white p-3 rounded-md mt-4 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? btnStages[btnStage] : "Log in"}
            </button>

            <p className="text-center text-blue-500 mt-3 cursor-pointer hover:underline">
              Forgotten password?
            </p>
            <hr className="my-4" />
            <button
              className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600"
              onClick={() => {
                setIsSignUp(true);
                setErrors({});
                setIsSubmitting(false);
              }}
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
