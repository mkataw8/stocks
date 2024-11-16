import React from "react";
import ArmyClock from "./ArmyClock";

const Header: React.FC = () => (
  <header className="flex justify-between items-center p-4  bg-white shadow-md">
    <h1 className="text-xl font-bold text-black">FASTANT</h1>
    <span className="text-lg text-black">
      <ArmyClock />
    </span>
    <div className="w-6 h-6 bg-black rounded-full"></div>
  </header>
);

export default Header;
