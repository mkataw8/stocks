"use client";
import CurrentBonds from "@/src/components/CurrentBonds";
import NewsFeed from "@/src/components/NewsFeed";
import { useState } from "react";

import ContentArea from "@/src/components/ContentArea";
import Header from "@/src/components/Header";
import SearchSection from "@/src/components/SearchSection";
import StockData from "@/src/components/StockData";
import Estimate from "../components/Estimate";
import Journal from "../components/Journal";
import Notes from "../components/Notes";

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

  const [activeTab, setActiveTab] = useState<string>("Chart");
  const [selectedStock, setSelectedStock] = useState<string>("AAPL"); // Example default stock

  const renderContent = () => {
    switch (activeTab) {
      case "Chart":
        return <ContentArea getStock={stockName} />;
      case "Journal":
        return <Journal />;
      case "Estimate":
        return <Estimate />;
      case "Notes":
        return <Notes />;
      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen  bg-white">
      {/* Header Section */}
      <Header />
      {/* News Feed */}
      <div className="px-4">
        <NewsFeed />
      </div>
      {/* Search Section and Bonds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mt-4">
        <SearchSection
          handleSearchData={handleSearchData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <CurrentBonds />
      </div>
      {/* Content Area */}
      <div className="px-4 mt-4">
        <div className="">{renderContent()}</div>
      </div>
      {/* Stock Data */}
      <div className="mt-4  ">
        <StockData getStock={stockName} />
      </div>
    </div>
  );
};
