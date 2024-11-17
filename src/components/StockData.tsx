import React from "react";

const GridComponent: React.FC = () => {
  return (
    <div className="w-full h-70 grid grid-rows-2 grid-cols-3 gap-4 bg-gray-800 p-4">
      {/* Row 1 */}

      <div className=" rounded grid grid-rows-2 gap-2 ">
        <div className="bg-blue-500 text-[100px] text-white flex items-center justify-center rounded">
          QS
        </div>
        <div className="bg-red-500  text-[40px] text-white flex items-center justify-center rounded">
          Volume : 14,000,200
        </div>
      </div>
      <div className="bg-green-500 text-[100px] text-white flex items-center justify-center rounded">
        $5.05
      </div>
      <div className="bg-purple-500 text-white flex items-center justify-center rounded">
        <ul>
          <li>Outstanding Shares</li>
          <li>Market Cap</li>
          <li>Short Interest</li>
        </ul>
      </div>
    </div>
  );
};

export default GridComponent;
