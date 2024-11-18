import React from "react";
import ArmyClock from "./ArmyClock";

const today = new Date();

const year = today.getFullYear();
const monthNames = [
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
];
const month = monthNames[today.getMonth()]; // Get month name
const day = today.getDate();

const formattedDate = `${month} ${day}, ${year}`;
const Header: React.FC = () => (
  <header className="flex justify-between items-center p-4  bg-white shadow-md">
    <h1 className="text-xl font-bold text-black">FASTANT</h1>
    <span className="text-lg text-black">
      <ArmyClock />
    </span>
    <div className="flex text-black ">
      <p className="mr-5 text-lg font-bold">{formattedDate}</p>
      <div className="w-7 h-7 bg-black rounded-full"></div>
    </div>
  </header>
);

export default Header;
