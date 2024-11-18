"use client";
import React, { useRef } from "react";

type ChildProps = {
  handleSearchData: (data: string) => void;
};

const SearchSection: React.FC<ChildProps> = ({ handleSearchData }) => {
  const inputRef = useRef<HTMLInputElement>(null); // Ref to track the input value

  // Handle search button click
  function handleSearch() {
    if (inputRef.current) {
      handleSearchData(inputRef.current.value); // Update stockName with input value
      console.log("Searching for stock:", inputRef.current.value);
    }
  }

  return (
    <div className="col-span-2 content-center">
      {/* Row: Search Bar */}
      <div className="w-full flex justify-center">
        {/* Search Bar */}
        <div className="flex items-center border rounded shadow-md px-4 py-2 w-full max-w-5xl bg-gray-200">
          <input
            type="text"
            ref={inputRef}
            placeholder="Lookup Stock..."
            className="flex-grow pl-5 text-black bg-white outline-none rounded mr-5  text-lg"
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
