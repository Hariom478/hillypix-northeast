export interface WatchProgress {
  seriesId: number;
  episodeId: number;
  progress: number; // percentage
  timestamp: number;
  duration: number;
}

export const useWatchProgress = () => {
  const getProgress = (seriesId: number, episodeId: number): WatchProgress | null => {
    const saved = localStorage.getItem(`watch_progress_${seriesId}_${episodeId}`);
    return saved ? JSON.parse(saved) : null;
  };

  const saveProgress = (progress: WatchProgress) => {
    localStorage.setItem(
      `watch_progress_${progress.seriesId}_${progress.episodeId}`,
      JSON.stringify(progress)
    );
  };

  const getAllProgress = (): WatchProgress[] => {
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith('watch_progress_')
    );
    return keys.map(key => JSON.parse(localStorage.getItem(key) || '{}'));
  };

  const getContinueWatching = (): WatchProgress[] => {
    return getAllProgress()
      .filter(p => p.progress > 5 && p.progress < 95) // Not just started, not finished
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);
  };

  return {
    getProgress,
    saveProgress,
    getAllProgress,
    getContinueWatching
  };
};
