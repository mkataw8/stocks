"use client";
import React from "react";

type NavigationBarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  firstName?: string;
};

const NavigationBar: React.FC<NavigationBarProps> = ({
  activeTab,
  setActiveTab,
  firstName,
}) => {
  const tabs = ["Chart", "Journal", "Estimate", "Notes"];

  return (
    <div className="flex items-center justify-between bg-slate-950 text-white py-4 px-6 rounded-lg shadow-md">
      {/* Welcome Message */}
      <div className="text-4xl space-x-3 font-bold flex sm:text-2xl">
        <p className="text-orange-500">Welcome</p> <p>{firstName}</p>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex space-x-8 text-xl sm:space-x-4 sm:text-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`hover:text-blue-500 transition duration-200 ${
              activeTab === tab ? "text-blue-500 font-bold" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavigationBar;
