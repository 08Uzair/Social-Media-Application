"use client"
import dynamic from "next/dynamic.js";
import React, { useState, useEffect } from "react";

const MainContent = dynamic(() => import("./MainContent.jsx"));
const MainPopUp = dynamic(() => import("./MainPopUp.jsx"));

const Dashboard = () => {
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    setShowPopUp(true);
    console.log("trigger");
  }, []);
  return (
    <>
      {showPopUp && <MainPopUp />}

      <MainContent />
    </>
  );
};

export default Dashboard;
