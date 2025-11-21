import { useState, useEffect } from 'react';

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

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
    const saved = localStorage.getItem('hillywood_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hillywood_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (item: Omit<WatchlistItem, 'addedAt'>) => {
    const newItem = {
      ...item,
      addedAt: new Date().toISOString()
    };
    setWatchlist(prev => {
      // Check if already in watchlist
      if (prev.some(w => w.id === item.id)) {
        return prev;
      }
      return [...prev, newItem];
    });
    return true;
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist(prev => prev.filter(item => item.id !== id));
  };

  const isInWatchlist = (id: number) => {
    return watchlist.some(item => item.id === id);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  };
};
