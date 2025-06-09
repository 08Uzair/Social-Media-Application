"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import advertisement from "../../public/assets/advertisement.png";
import member1 from "../../public/assets/member-1.png";
import member2 from "../../public/assets/member-2.png";
import member3 from "../../public/assets/member-3.png";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/auth";
const RightSidebar = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state);
  console.log(users, "This are loged users");

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div className="right-sidebar">
      <div className="sidebar-title">
        <h4>Events</h4>
        <a href="#">See All</a>
      </div>

      <div className="event">
        <div className="left-event">
          <h3>18</h3>
          <span>March</span>
        </div>
        <div className="right-event">
          <h4>Social Media</h4>
          <p>
            <i className="bx bxs-location-plus"></i>Willson Tech Park
          </p>
          <a href="#">More Info</a>
        </div>
      </div>
      <div className="event">
        <div className="left-event">
          <h3>22</h3>
          <span>June</span>
        </div>
        <div className="right-event">
          <h4>Mobile Marketing</h4>
          <p>
            <i className="bx bxs-location-plus"></i>Willson Tech Parks
          </p>
          <a href="#">More Info</a>
        </div>
      </div>

      <div className="sidebar-title">
        <h4>Advertisement</h4>
        <a href="#">Close</a>
      </div>
      <Image src={advertisement} className="sidebar-ads" alt="" />

      <div className="sidebar-title">
        <h4>Conversation</h4>
        <a href="#">Hide Chat</a>
      </div>

      <div className="online-list">
        <div className="online">
          <Image src={member1} alt="" />
        </div>
        <p>Alison Mina</p>
      </div>
      <div className="online-list">
        <div className="online">
          <Image src={member2} alt="" />
        </div>
        <p>Jackson Aston</p>
      </div>
      <div className="online-list">
        <div className="online">
          <Image src={member3} alt="" />
        </div>
        <p>Simona Rose</p>
      </div>
    </div>
  );
};

export default RightSidebar;
