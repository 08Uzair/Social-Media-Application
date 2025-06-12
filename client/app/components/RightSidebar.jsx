"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import portfolio from "../../public/assets/portfolio.png";
import member1 from "../../public/assets/member-1.png";
import member2 from "../../public/assets/member-2.png";
import member3 from "../../public/assets/member-3.png";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/auth";
import Link from "next/link";
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
        <h4>Portfolio</h4>*
      </div>
      <Link 
      target="_blank"
      href="https://uzerqureshi-portfolio.netlify.app/">
        <div className="relative group w-fit shadow">
          {/* The Image */}
          <Image
            width={500}
            height={500}
            src={portfolio}
            alt="Portfolio"
            className="sidebar-ads transition duration-300"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition rounded-[10px] cursor-pointer duration-300 flex items-center justify-center">
            🔗
          </div>
        </div>
      </Link>

      <div className="sidebar-title">
        <h4>Conversation</h4>*
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
