"use client";

import AddStockForm from "@/src/components/watchList/AddStockForm";
import StockItem from "@/src/components/watchList/StockItem";
import useWatchlist from "@/src/hooks/useWatchList";
import React from "react";

const WatchList: React.FC = () => {
  const {
    watchlist,
    addStock,
    editStock,
    deleteStock,
    newStock,
    setNewStock,
    newShares,
    setNewShares,
  } = useWatchlist();

  return (
    <div className="bg-orange-500 h-[500px] p-4 rounded-lg shadow-lg">
      <h3 className="text-white text-lg font-semibold mb-4">Your Watchlist</h3>

      <ul className="space-y-2 overflow-y-auto">
        {watchlist.length > 0 ? (
          watchlist.map((stock) => (
            <StockItem
              key={stock.id}
              stock={stock}
              onEdit={editStock}
              onDelete={deleteStock}
            />
          ))
        ) : (
          <li className="text-white text-sm">
            No stocks in your watchlist. Add one below!
          </li>
        )}
      </ul>

      <AddStockForm
        addStock={addStock}
        newStock={newStock}
        setNewStock={setNewStock}
        newShares={newShares}
        setNewShares={setNewShares}
      />
    </div>
  );
};

export default WatchList;
