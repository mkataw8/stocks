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
          `https://api.marketstack.com/v1/eod?access_key=${market_API}&symbols=${getStock}`
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
    <div className="w-full p-4 bg-gray-900 text-white rounded-lg shadow-lg space-y-4">
      {/* Ticker Information */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-4">
        <h1 className="text-2xl font-bold">
          {tickerInfo?.ticker || "Loading..."}
        </h1>
        <div className="text-lg font-semibold">
          ${tickerInfo?.close.toFixed(2) || "Loading..."}
        </div>
      </div>

      {/* Price Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center p-3 bg-gray-800 rounded-lg">
          <span className="text-sm text-gray-400">Open</span>
          <span className="text-lg font-bold">
            ${tickerInfo?.open.toFixed(2) || "N/A"}
          </span>
        </div>
        <div className="flex flex-col items-center p-3 bg-gray-800 rounded-lg">
          <span className="text-sm text-gray-400">High</span>
          <span className="text-lg font-bold">
            ${tickerInfo?.high.toFixed(2) || "N/A"}
          </span>
        </div>
        <div className="flex flex-col items-center p-3 bg-gray-800 rounded-lg">
          <span className="text-sm text-gray-400">Low</span>
          <span className="text-lg font-bold">
            ${tickerInfo?.low.toFixed(2) || "N/A"}
          </span>
        </div>
        <div className="flex flex-col items-center p-3 bg-gray-800 rounded-lg">
          <span className="text-sm text-gray-400">Volume</span>
          <span className="text-lg font-bold">
            {tickerInfo?.volume.toLocaleString() || "N/A"}
          </span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Additional Info</h3>
        <ul className="space-y-2">
          <li>
            <span className="text-sm text-gray-400">Outstanding Shares:</span>{" "}
            <span className="text-lg font-bold">
              {moreInfo?.outstandingShares.toLocaleString() || "N/A"}
            </span>
          </li>
          <li>
            <span className="text-sm text-gray-400">Market Cap:</span>{" "}
            <span className="text-lg font-bold">
              {moreInfo && tickerInfo
                ? formatMarketCap(moreInfo.outstandingShares * tickerInfo.close)
                : "N/A"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StockData;
