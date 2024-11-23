"use client";
import CurrentBonds from "@/src/components/CurrentBonds";
import NewsFeed from "@/src/components/NewsFeed";
import { useState } from "react";

import ContentArea from "@/src/components/ContentArea";
import Header from "@/src/components/Header";
import SearchSection from "@/src/components/SearchSection";
import StockData from "@/src/components/StockData";

interface User {
  id: string;
  email: string;
  created_at: string;
}

export const Fastant = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [stockName, setStockName] = useState<string>("SPY");
  const handleSearchData = (data: string) => {
    setStockName(data);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <Header />

      {/* News Feed */}
      <div className="px-4">
        <NewsFeed />
      </div>

      {/* Search Section and Bonds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mt-4">
        <SearchSection handleSearchData={handleSearchData} />
        <CurrentBonds />
      </div>

      {/* Content Area */}
      <div className="px-4 mt-4">
        <ContentArea getStock={stockName} />
      </div>

      {/* Stock Data */}
      <div className="px-4 mt-4">
        <StockData getStock={stockName} />
      </div>
    </div>
  );
};
