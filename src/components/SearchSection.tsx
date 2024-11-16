import React from "react";

const SearchSection: React.FC = () => {
  return (
    <div className="col-span-2 content-center">
      {/* Row: Search Bar */}
      <div className="w-full flex justify-center">
        {/* Search Bar */}
        <div className="flex items-center border rounded shadow-md px-4 py-2 w-full max-w-5xl bg-gray-200">
          <input
            type="text"
            placeholder="Lookup Stock..."
            className="flex-grow pl-5 text-black bg-white outline-none rounded mr-5  text-lg"
          />
          <button className="bg-slate-400 py-2 px-6 rounded-full hover:bg-blue-600 hover:text-yellow-200">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
