import { useState, useEffect } from "react";
import { 
  getWatchListData, 
  addToWatchList as addToWatchListAPI, 
  removeFromWatchlist as removeFromWatchListAPI 
} from "@/lib/graphql";

export interface WatchlistItem {
  id: number;
  title: string;
  poster: string;
  rating: number;
  duration: string;
  language: string;
  genre: string;
  addedAt: string;
}

export const useWatchlist = (userId=null, type=null) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
    const saved = localStorage.getItem("hillywood_watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch watchlist from API when component loads or user changes
  useEffect(() => {
    if (!userId) return;

    const fetchWatchlist = async () => {
      const data = await getWatchListData(userId,type);

      const formatted = Array.isArray(data) ? data : [];

      setWatchlist(formatted);
      localStorage.setItem("hillywood_watchlist", JSON.stringify(formatted));
    };

    fetchWatchlist();
  }, [userId, type]);

  // Add item to watchlist
  const addToWatchlist = async (item: Omit<WatchlistItem, "addedAt">) => {

    try {

      const input={
        user_id:userId,
        title_id:item.id
      }
      await addToWatchListAPI(input);

      const newItem = {
        ...item,
        addedAt: new Date().toISOString(),
      };

      setWatchlist((prev) => {
        if (prev.some((w) => w.id === item.id)) return prev;
        return [...prev, newItem];
      });

      return true;
    } catch (err) {
      console.error("Error adding to watchlist:", err);
      return false;
    }
  };

  // Remove item
 const removeWatchlistItem = async (id: number) => {
  try {
    const input = {
      user_id: userId,
      title_id: id
    };

    await removeFromWatchListAPI(input);

    setWatchlist(prev => prev.filter(item => item.id !== id));
  } catch (err) {
    console.error("Error removing from watchlist:", err);
  }
};


  // Check if item exists
  const isInWatchlist = (id: number) => {
    return Array.isArray(watchlist) && watchlist.some((item) => item.id === id);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist: removeWatchlistItem,
    isInWatchlist,
  };
};
