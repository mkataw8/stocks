"use client";

import { supabase } from "@/src/lib/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";

type Stock = {
  id?: number;
  ticker: string;
  shares: number;
};

const WatchlistComponent: React.FC = () => {
  const { user } = useUser();
  const userID = user?.id ?? "";
  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [newStock, setNewStock] = useState<string>("");
  const [newShares, setNewShares] = useState<string>("");

  useEffect(() => {
    if (!userID) return;

    const fetchWatchlist = async () => {
      try {
        const { data, error } = await supabase
          .from("watchlist")
          .select("*")
          .eq("user_id", userID);

        if (error) {
          console.error("Error fetching watchlist:", error.message);
        } else {
          setWatchlist(data ?? []);
        }
      } catch (err) {
        console.error("Failed to fetch watchlist:", err);
      }
    };

    fetchWatchlist();
  }, [userID]);

  const addStock = async () => {
    if (!userID) {
      console.error("User ID is missing. Ensure the user is logged in.");
      return;
    }

    if (!newStock || !newShares || isNaN(parseInt(newShares))) {
      alert("Please enter a valid stock ticker and number of shares.");
      return;
    }

    const newEntry = {
      ticker: newStock.toUpperCase(),
      shares: parseInt(newShares),
      user_id: userID,
    };

    const tempId = Date.now();
    setWatchlist((prev) => [...prev, { ...newEntry, id: tempId }]);

    const { data, error } = await supabase.from("watchlist").insert(newEntry);

    if (error) {
      console.error("Error adding stock:", error.message);

      setWatchlist((prev) => prev.filter((stock) => stock.id !== tempId));
    } else if (data) {
      console.log("New stock added:", data);

      setWatchlist((prev) => [
        ...prev,
        ...(Array.isArray(data) ? data : [data]),
      ]);
    }

    setNewStock("");
    setNewShares("");
  };

  return (
    <div className="bg-orange-500 h-[500px] p-4 rounded-lg shadow-lg">
      <h3 className="text-white text-lg font-semibold mb-4">Your Watchlist</h3>

      <ul className="space-y-2 overflow-y-auto">
        {watchlist.length > 0 ? (
          watchlist.map((stock) => (
            <li
              key={stock.id}
              className="flex justify-between items-center text-sm bg-white text-black p-2 rounded shadow"
            >
              <span>{stock.ticker}</span>
              <span>{stock.shares} Shares</span>
            </li>
          ))
        ) : (
          <li className="text-white text-sm">
            No stocks in your watchlist. Add one below!
          </li>
        )}
      </ul>

      <div className="mt-3">
        <h4 className="text-sm font-semibold mb-2 text-white">Add a Stock</h4>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Ticker (e.g., AAPL)"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
            className="p-2 rounded w-1/3 text-black"
          />
          <input
            type="text"
            placeholder="Shares (e.g., 10)"
            value={newShares}
            onChange={(e) => setNewShares(e.target.value)}
            className="p-2 rounded w-1/3 text-black"
          />
          <button
            onClick={addStock}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistComponent;
