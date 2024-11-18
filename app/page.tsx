"use client";
import CurrentBonds from "@/src/components/CurrentBonds";
import NewsFeed from "@/src/components/NewsFeed";
import { useState } from "react";
import ContentArea from "../src/components/ContentArea";
import Header from "../src/components/Header";
import SearchSection from "../src/components/SearchSection";
import StockData from "../src/components/StockData";

export default function Home() {
  const [stockName, setStockName] = useState<string>("");
  const handleSearchData = (data: string) => {
    setStockName(data);
    console.log("hi", stockName);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="">
        {stockName}
        <Header />
        <NewsFeed />
        <div className="grid grid-cols-3 gap-4  px-4">
          <SearchSection handleSearchData={handleSearchData} />
          <CurrentBonds />
        </div>
        <ContentArea />
        <StockData getStock={stockName} />
      </div>
    </div>
  );
}
