import { supabase } from "@/src/lib/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

type Stock = {
  id?: number;
  ticker: string;
  shares: number;
};

const useWatchlist = () => {
  const { user } = useUser();
  const userID = user?.id ?? "";

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
    if (!userID || !newStock || !newShares || isNaN(parseInt(newShares))) {
      alert("Invalid stock or shares input.");
      return;
    }

    const newEntry = {
      ticker: newStock.toUpperCase(),
      shares: parseInt(newShares),
      user_id: userID,
    };
    setWatchlist((prev) => [...prev, { ...newEntry, id: Date.now() }]);

    const { data, error } = await supabase.from("watchlist").insert(newEntry);
    if (error) console.error("Error adding stock:", error.message);

    setNewStock("");
    setNewShares("");
  };

  const deleteStock = async (id: number | undefined) => {
    if (!id) return;

    setWatchlist((prev) => prev.filter((stock) => stock.id !== id));
    const { error } = await supabase.from("watchlist").delete().eq("id", id);

    if (error) console.error("Error deleting stock:", error.message);
  };

  const editStock = async (id: number | undefined, shares: number) => {
    if (!id) return;

    const newShares = prompt("Enter new shares:", shares.toString());
    if (!newShares || isNaN(parseInt(newShares))) return;

    setWatchlist((prev) =>
      prev.map((stock) =>
        stock.id === id ? { ...stock, shares: parseInt(newShares) } : stock
      )
    );

    const { error } = await supabase
      .from("watchlist")
      .update({ shares: parseInt(newShares) })
      .eq("id", id);

    if (error) console.error("Error updating stock:", error.message);
  };

  return {
    watchlist,
    addStock,
    deleteStock,
    editStock,
    newStock,
    setNewStock,
    newShares,
    setNewShares,
  };
};

export default useWatchlist;
