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

export const Fastant = () => {
  const [stockName, setStockName] = useState<string>("SPY");
  const [activeTab, setActiveTab] = useState<string>("Chart");
  const [selectedStock, setSelectedStock] = useState<string>("AAPL");

  const handleSearchData = (data: string) => {
    setStockName(data);
  };

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
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <Header />

      {/* Main Content Wrapper */}
      <div className="container mx-auto max-w-6xl space-y-6 px-4">
        {/* News Feed */}
        <div>
          <NewsFeed />
        </div>

        {/* Search Section and Bonds */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SearchSection
            handleSearchData={handleSearchData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <CurrentBonds />
        </div>

        {/* Content Area */}
        <div className="bg-gray-100  rounded-lg p-3 shadow">
          {renderContent()}
        </div>

        {/* Stock Data */}
        <div className="bg-slate-900 w-full p-4 rounded-lg shadow">
          <StockData getStock={stockName} />
        </div>
      </div>
    </div>
  );
};
