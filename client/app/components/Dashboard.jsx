import React from "react";
import LeftSidebar from "./LeftSidebar";
import MainContent from "./MainContent";
import RightSidebar from "./RightSidebar";

const Dashboard = () => {
  return (
    <div className="flex justify-between px-5 mt-4">
      <LeftSidebar />
      <MainContent />
      <RightSidebar />
    </div>
  );
};

export default Dashboard;
