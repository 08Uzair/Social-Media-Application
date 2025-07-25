import dynamic from "next/dynamic.js";
import React from "react";

const MainContent = dynamic(() => import("./MainContent.jsx"));

const Dashboard = () => {
  return (
    <>

     
      <MainContent />
     
    </>
    
  );
};

export default Dashboard;
