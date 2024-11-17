"use client";
import React, { useEffect, useState } from "react";

const CurrentBonds: React.FC = () => {
  const [data, setData] = useState<{ value: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [selectedYield, setSelectedYield] = useState<number | null>(null);

  useEffect(() => {
    const fetchYields = async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=monthly&maturity=${year}year&apikey=https://www.alphavantage.co/K6HTAFFF0M6CAMEP`
      );
      const data = await response.json();
      const get_year = data.data?.[0];
      if (get_year) {
        setData(get_year);
      } else {
        setError("No data available.");
      }
    };
    fetchYields();
  });

  const handle5Yield = () => {
    setYear("5");
    setSelectedYield(5);
  };
  const handle10Yield = () => {
    setYear("10");
    setSelectedYield(10);
  };
  return (
    <div className="bg-black text-white  p-4 shadow-md  h-30">
      <h3 className="text-lg font-semibold">Bond Information</h3>
      <ul className="mt-2 space-y-2">
        <li className="text-sm">Bond Type: Treasury</li>
        <li className="text-sm">Yield: {data?.value}%</li>
        <li className=" flex  text-sm">
          Maturity: &nbsp;
          <p
            onClick={handle5Yield}
            className={`cursor-pointer hover:underline text-white ${
              selectedYield === 5 ? "text-orange-400 font-bold" : "text-black"
            }`}
          >
            5
          </p>
          &nbsp;or&nbsp;
          <p
            onClick={handle10Yield}
            className={`cursor-pointer hover:underline text-white ${
              selectedYield === 10 ? "text-orange-400 font-bold" : "text-black"
            }`}
          >
            10
          </p>
          &nbsp;Year
        </li>
      </ul>
    </div>
  );
};

export default CurrentBonds;
