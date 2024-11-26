"use client";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Menu and Close icons

type NavigationBarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  firstName?: string;
};

const Navigation: React.FC<NavigationBarProps> = ({
  activeTab,
  setActiveTab,
  firstName,
}) => {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
  const tabs = ["Chart", "Journal", "Estimate", "Notes"];

  return (
    <div className="flex items-center justify-between bg-slate-950 text-white py-4 px-6 rounded-lg shadow-md">
      {/* Welcome Message */}
      <div className="text-4xl space-x-3 font-bold flex sm:text-2xl">
        <p className="text-orange-500">Welcome</p> <p>{firstName || "Guest"}</p>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="sm:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 text-2xl">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Navigation Tabs */}
      <nav
        className={`flex-col sm:flex sm:flex-row sm:space-x-8 text-xl sm:space-x-4 sm:text-sm absolute sm:static bg-slate-950 sm:bg-transparent w-full sm:w-auto top-[70px] left-0 z-10 sm:z-auto sm:p-0 p-4 ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`block sm:inline-block hover:text-blue-500 transition duration-200 ${
              activeTab === tab ? "text-blue-500 font-bold" : ""
            }`}
            onClick={() => {
              setActiveTab(tab);
              setMenuOpen(false); // Close menu on tab click
            }}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
