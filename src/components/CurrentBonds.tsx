"use client";
import React, { useEffect, useState } from "react";

const CurrentBonds: React.FC = () => {
  const [data, setData] = useState<{ value: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [selectedYield, setSelectedYield] = useState<number | null>(null);
  const sec_API = process.env.NEXT_PUBLIC_SEC_API;
  useEffect(() => {
    if (!year) return; // Prevent fetching if `year` is null

    const fetchYields = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=monthly&maturity=${year}year&apikey=${sec_API}`
        );
        const data = await response.json();
        const get_year = data.data?.[0];
        if (get_year) {
          setData(get_year);
          setError(null);
        } else {
          setError("No data available.");
        }
      } catch (err) {
        setError("Failed to fetch data.");
      }
    };

    fetchYields();
  }, [year]);

  const handle5Yield = () => {
    setYear("5");
    setSelectedYield(5);
  };

  const handle10Yield = () => {
    setYear("10");
    setSelectedYield(10);
  };

  return (
    <div className="bg-black text-white p-4 shadow-md h-30">
      <h3 className="text-lg font-semibold">Bond Information</h3>
      <ul className="mt-2 space-y-2">
        <li className="text-sm">Bond Type: Treasury</li>
        <li className="text-sm">
          Yield:{" "}
          {data ? `${data.value}%` : error || "Select a maturity to see yield."}
        </li>
        <li className="flex text-sm">
          Maturity: &nbsp;
          <p
            onClick={handle5Yield}
            className={`cursor-pointer hover:underline ${
              selectedYield === 5
                ? "text-orange-400 font-bold"
                : "text-gray-300"
            }`}
          >
            5
          </p>
          &nbsp;or&nbsp;
          <p
            onClick={handle10Yield}
            className={`cursor-pointer hover:underline ${
              selectedYield === 10
                ? "text-orange-400 font-bold"
                : "text-gray-300"
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
