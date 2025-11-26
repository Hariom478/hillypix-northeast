import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pause, Play, SkipBack, SkipForward, Maximize } from "lucide-react";
import { getUser } from "@/lib/localAuth";
import Api from "@/api/serverApi";

const VideoPlayerPage = () => {
  const user = getUser();
  const { state } = useLocation();
  const navigate = useNavigate();
  const movie = state?.videos;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Time tracking
  const lastTimeRef = useRef<number | null>(null);
  const totalPlayedSeconds = useRef<number>(0);
  const unsavedPlayedSeconds = useRef<number>(0);

  // Rent check tracking
  const lastRentCheckTime = useRef<number>(0);

  // UI states
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRentExpired, setRentExpired] = useState(false);

  if (!movie) {
    return (
      <div className="p-10 text-center text-xl text-white">
        ❌ No movie selected.
        <Button className="block mx-auto mt-4" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "00:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };

  // -----------------------------------------
  // SAVE PROGRESS (API CALL)
  // -----------------------------------------
  const saveProgress = useCallback(
    async ({ force = false } = {}) => {
      if (!videoRef.current || !user?.id) return;

      const v = videoRef.current;
      const unsaved = Math.floor(unsavedPlayedSeconds.current);

      if (!force && unsaved <= 10) return;

      try {
        const reqData = {
          user_id: user.id,
          title_id: movie.title_id,
          video_id: movie.id,
          time: formatTime(v.currentTime),
        };

        await Api("/save-video-resume-position", "POST", reqData);

        await Api("/pay-watch-video-time", "POST", {
          ...reqData,
          played_seconds: unsaved,
          total_played_seconds: Math.floor(totalPlayedSeconds.current),
          video_total_time: formatTime(v.duration),
        });

        console.log("✔ AUTO-SAVED:", unsaved);
        unsavedPlayedSeconds.current = 0;
      } catch (err) {
        console.error("❌ Save failed:", err);
      }
    },
    [movie, user]
  );

  // -----------------------------------------
  // REAL TIME TRACKING ENGINE (NO INTERVAL)
  // -----------------------------------------
  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    const current = v.currentTime;
    const last = lastTimeRef.current;

    let delta = 0;

    if (last !== null) {
      delta = current - last;

      // Only count real forward play (IGNORE SEEK)
      if (delta > 0 && delta < 3) {
        totalPlayedSeconds.current += delta;
        unsavedPlayedSeconds.current += delta;
      }
    }

    // Reset detection
    if (last !== null && current < 1 && last > 1) {
      totalPlayedSeconds.current = 0;
      unsavedPlayedSeconds.current = 0;
    }

    // -------------------------
    // AUTO-SAVE AFTER 10s PLAYED
    // -------------------------
    if (unsavedPlayedSeconds.current >= 10) {
      console.log("⏳ 10 seconds played → Saving progress...");
      saveProgress({ force: true });
      unsavedPlayedSeconds.current = 0;
    }

    // -------------------------
    // RENT CHECK EVERY 12s PLAYED
    // -------------------------
    if (totalPlayedSeconds.current - lastRentCheckTime.current >= 12) {
      lastRentCheckTime.current = totalPlayedSeconds.current;

      console.log("🛂 Checking rent availability...");

      (async () => {
        try {
          const res = await Api("/rent-available", "POST", {
            user_id: user?.id,
            title_id: movie?.title_id,
          });

          const json = await res.json();
          const available = json?.data?.getpayperwatch;

          if (available) {
            setRentExpired(true);
            v.pause();
            setIsPlaying(false);
            setTimeout(() => navigate(-1), 4000);
          }
        } catch (err) {
          console.error("❌ Rent check failed", err);
        }
      })();
    }

    // Update progress bar
    setProgress((current / (v.duration || 1)) * 100);

    lastTimeRef.current = current;
  }, [movie, user, navigate, saveProgress]);

  // Metadata load
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onMeta = () => {
      setDuration(v.duration || 0);
      lastTimeRef.current = v.currentTime;
    };

    v.addEventListener("loadedmetadata", onMeta);
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, []);

  // Attach timeupdate listener
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.addEventListener("timeupdate", handleTimeUpdate);
    return () => v.removeEventListener("timeupdate", handleTimeUpdate);
  }, [handleTimeUpdate]);

  // Save on unload
  useEffect(() => {
    const fn = () => saveProgress({ force: true });
    window.addEventListener("beforeunload", fn);
    return () => window.removeEventListener("beforeunload", fn);
  }, [saveProgress]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      if (v.currentTime < 1 && totalPlayedSeconds.current > 0) {
        totalPlayedSeconds.current = 0;
        unsavedPlayedSeconds.current = 0;
      }
      await v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      saveProgress({ force: true });
      setIsPlaying(false);
    }
  };

  const skip = (sec: number) => {
    const v = videoRef.current;
    if (!v || isRentExpired) return;

    v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + sec));
  };

  const goFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  const handleSeek = (value: number) => {
    const v = videoRef.current;
    if (!v || isRentExpired) return;

    v.currentTime = (value / 100) * v.duration;
    setProgress(value);
  };

  // -----------------------------------------
  // UI
  // -----------------------------------------
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 fixed top-0 w-full bg-black/50 backdrop-blur-xl z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => saveProgress({ force: true }).finally(() => navigate(-1))}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{movie?.name}</h1>
      </div>

      <div className="flex-1 flex justify-center items-center pt-12">
        <video
          ref={videoRef}
          src={movie?.url}
          autoPlay
          className="w-full lg:max-h-[75vh] md:max-h-[60vh] max-h-[50vh] bg-black"
          controls={false}
          controlsList="nodownload"
          disablePictureInPicture
        />
      </div>

      <div className="px-6 py-2">
        <div className="flex justify-between text-gray-300 text-sm mb-1">
          <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          disabled={isRentExpired}
          onChange={(e) => handleSeek(Number(e.target.value))}
          className="accent-yellow-400 w-full"
        />
      </div>

      <div className="flex justify-center items-center gap-6 lg:py-3 md:py-1 py-1 bg-black/60">
        <Button size="icon" onClick={() => skip(-10)} disabled={isRentExpired}>
          <SkipBack className="w-6 h-6" />
        </Button>

        <Button size="icon" onClick={togglePlay} disabled={isRentExpired}>
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>

        <Button size="icon" onClick={() => skip(10)} disabled={isRentExpired}>
          <SkipForward className="w-6 h-6" />
        </Button>

        <Button size="icon" onClick={goFullscreen}>
          <Maximize className="w-6 h-6" />
        </Button>
      </div>

      {isRentExpired && (
        <div className="text-center text-red-400 py-4 font-bold">
          ⛔ Rental expired — redirecting...
        </div>
      )}
    </div>
  );
};

export default VideoPlayerPage;
