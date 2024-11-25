"use client";
import React, { useEffect, useState } from "react";

type inFo = {
  ticker: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
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
  const market_API = process.env.NEXT_PUBLIC_MARKETSTACK_API;

  function getBusinessDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();

    if (dayOfWeek === 0) {
      today.setDate(today.getDate() - 2);
    } else if (dayOfWeek === 6) {
      today.setDate(today.getDate() - 1);
    }

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (!getStock) return;

    const getStockData = async () => {
      const businessDate = getBusinessDate();
      try {
        const response = await fetch(
          `https://api.marketstack.com/v1/eod?access_key=${market_API}&symbols=${getStock}
`
        );
        if (!response.ok) {
          throw new Error("Marketstack API request failed.");
        }
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          const result = data.data[0];
          setTickerInfo({
            ticker: getStock,
            open: result.open,
            high: result.high,
            low: result.low,
            close: result.close,
            volume: result.volume,
          });
        } else {
          console.log("No results found for the stock.");
        }
      } catch (error) {
        console.error(
          "Could not fetch stock data from Marketstack API:",
          error
        );
      }
    };

    getStockData();
  }, [getStock]);

  useEffect(() => {
    if (!getStock) return;

    setMoreInfo({
      outstandingShares: Math.floor(Math.random() * 1_000_000_000),
    });
  }, [getStock]);

  const formatMarketCap = (value: number): string => {
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)} Billion`;
    } else if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)} Million`;
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}k`;
    } else {
      return value.toString();
    }
  };

  return (
    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-3  flex justify-between bg-gray-800 m-0 p-4">
      {/* Ticker Info */}
      <div className="rounded grid grid-rows-2  bg-gray-700 h-full w-full md:w-[300px]">
        <div className="bg-blue-500 text-[30px] md:text-[50px] text-white flex items-center justify-center   h-[125px]">
          {tickerInfo ? tickerInfo.ticker : "Loading..."}
        </div>
        <div className="bg-red-500 text-[20px] md:text-[30px] text-white flex items-center justify-center h-[125px] text-center">
          Volume:{" "}
          {tickerInfo ? tickerInfo.volume.toLocaleString() : "Loading..."}
        </div>
      </div>

      {/* Stock Price */}
      <div className="bg-green-500 text-[30px] md:text-[50px] text-white flex items-center justify-center rounded p-4 h-[250px] w-full md:w-[300px]">
        ${tickerInfo ? tickerInfo.close.toFixed(2) : "Loading..."}
      </div>

      {/* Additional Stock Information */}
      <div className="bg-purple-500 text-white text-[15px] md:text-[25px] flex flex-col justify-center items-start rounded p-4 h-[250px] w-full md:w-[300px]">
        <ul className="space-y-2">
          <li>
            <strong>Outstanding Shares:</strong>{" "}
            {moreInfo?.outstandingShares.toLocaleString() || "Loading..."}
          </li>
          <li>
            <strong>Market Cap:</strong>{" "}
            {moreInfo && tickerInfo
              ? formatMarketCap(moreInfo.outstandingShares * tickerInfo.close)
              : "Loading..."}
          </li>
          <li>
            <strong>Short Interest:</strong> Coming Soon
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StockData;
