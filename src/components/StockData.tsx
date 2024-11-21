"use client";
import React, { useEffect, useState } from "react";

type inFo = {
  ticker: string;
  vw: number;
  v: number;
  c: number;
};

type moreInfo = {
  outstandingShares: number;
};

type ChildProps = {
  getStock: string;
};

const StockData: React.FC<ChildProps> = ({ getStock }) => {
  const [tickerInfo, setTickerInfo] = useState<inFo | undefined>();
  const [moreInfo, setMoreInfo] = useState<moreInfo | undefined>();

  // Function to calculate the most recent business date
  function getBusinessDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();

    if (dayOfWeek === 0) {
      today.setDate(today.getDate() - 2); // Sunday -> Previous Friday
    } else if (dayOfWeek === 6) {
      today.setDate(today.getDate() - 1); // Saturday -> Previous Friday
    }

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Fetch stock price and volume data
  useEffect(() => {
    if (!getStock) return; // Ensure `getStock` is provided

    const getStockData = async () => {
      const businessDate = getBusinessDate();
      try {
        const response = await fetch(
          `https://api.polygon.io/v2/aggs/ticker/${getStock}/range/1/day/${businessDate}/${businessDate}?apiKey=rWgCPou0Ak2orivwUAflkn5ZWNiB3pGD`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          setTickerInfo({
            ticker: getStock,
            vw: result.vw,
            v: result.v,
            c: result.c,
          });
        } else {
          console.log("No results found for the stock.");
        }
      } catch (error) {
        console.error("Could not fetch stock data API:", error);
      }
    };

    getStockData();
  }, [getStock]);

  // Fetch outstanding shares data

  useEffect(() => {
    if (!getStock) return; // Ensure `getStock` is provided

    const getMore = async () => {
      try {
        const response = await fetch(
          `https://api.sec-api.io/float?ticker=${getStock}&token=f91aa71843bd10ce4e3440738859359388eae0af1f03ef0032f4fcc72adab899`
        );
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          const result = data.data[0]; // Assuming first result is the latest
          setMoreInfo({
            outstandingShares: result.float.outstandingShares[0].value, // Access outstandingShares from the result
          });
        } else {
          console.log("No results found for the stock.");
        }
      } catch (error) {
        console.error("Could not fetch stock data API:", error);
      }
    };

    getMore();
  }, [getStock]);

  const formatMarketCap = (value: number): string => {
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)} Billion`;
    } else if (value >= 1_000_000) {
      return `${Math.floor(value / 1_000_000)} Million ${Math.floor(
        (value % 1_000_000) / 1_000
      )}k`;
    } else if (value >= 1_000) {
      return `${Math.floor(value / 1_000)}k`;
    } else {
      return value.toString();
    }
  };
  return (
    <div className="w-full h-70 grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-800 p-4">
      {/* Ticker Information */}
      <div className="rounded grid grid-rows-2 gap-2">
        <div className="bg-blue-500 text-[50px] text-white flex items-center justify-center rounded h-full w-full">
          {tickerInfo ? tickerInfo.ticker : "Loading..."}
        </div>
        <div className="bg-red-500 text-[50px] md:text-[50px] text-white flex items-center justify-center rounded h-full w-full text-center">
          Volume: {tickerInfo ? tickerInfo.v.toLocaleString() : "Loading..."}
        </div>
      </div>

      {/* Stock Price */}
      <div className="bg-green-500 text-[50px] text-white flex items-center justify-center rounded h-full w-full">
        ${tickerInfo ? tickerInfo.c.toFixed(2) : "Loading..."}
      </div>

      {/* Additional Stock Information */}
      <div className="bg-purple-500 text-white text-[25px] flex items-center justify-center rounded">
        <ul>
          <li>
            Outstanding Shares:{" "}
            {moreInfo?.outstandingShares.toLocaleString() || "Loading..."}
          </li>
          <li>
            Market Cap:{" "}
            {moreInfo && tickerInfo
              ? formatMarketCap(moreInfo.outstandingShares * tickerInfo.c)
              : "Loading..."}
          </li>
          <li>Short Interest: Coming Soon</li>
        </ul>
      </div>
    </div>
  );
};

export default StockData;
