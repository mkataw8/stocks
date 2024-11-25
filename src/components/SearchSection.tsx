"use client";
import NavigationBar from "@/src/components/Navigation";
import { useUser } from "@clerk/clerk-react";
import React, { useRef } from "react";

type ChildProps = {
  handleSearchData: (data: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const SearchSection: React.FC<ChildProps> = ({
  handleSearchData,
  activeTab,
  setActiveTab,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const firstName = user?.firstName;

  // Handle search button click
  function handleSearch() {
    if (inputRef.current) {
      handleSearchData(inputRef.current.value.toUpperCase());
      console.log("Searching for stock:", inputRef.current.value);
    }
  }

  return (
    <div className="col-span-2 content-center">
      {/* Navigation Bar */}
      <NavigationBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        firstName={firstName}
      />

      {/* Row: Search Bar */}
      <div className="w-full flex justify-center mt-4">
        {/* Search Bar */}
        <div className="flex items-center border rounded shadow-md px-4 py-2 w-full max-w-5xl bg-gray-200">
          <input
            type="text"
            ref={inputRef}
            placeholder="Lookup Stock..."
            className="flex-grow pl-5 text-black bg-white outline-none rounded mr-5 text-lg"
          />
          <button
            onClick={handleSearch}
            className="bg-slate-400 py-2 px-6 rounded-full hover:bg-blue-600 hover:text-yellow-200"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
