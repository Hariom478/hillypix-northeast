import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pause, Play, SkipBack, SkipForward, Maximize } from "lucide-react";

const VideoPlayerPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const movie = state?.videos;

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // slider value
  const [duration, setDuration] = useState(0);

  if (!movie) {
    return (
      <div className="p-10 text-center text-xl">
        ❌ No movie selected.  
        <Button className="block mx-auto mt-4" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };


  useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const updateTime = () => {
    setProgress((video.currentTime / video.duration) * 100);
    setDuration(video.duration);
  };

  video.addEventListener("timeupdate", updateTime);
  return () => video.removeEventListener("timeupdate", updateTime);
}, []);


  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime += seconds;
    }
  };

  const goFullscreen = () => {
    const video = videoRef.current;
    if (video?.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  // Update progress as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setProgress((video.currentTime / video.duration) * 100);
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", updateTime);
    return () => video.removeEventListener("timeupdate", updateTime);
  }, []);

  // Seeking by slider
  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (value / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(value);
  };

  const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};


  return (
    <div className="w-full h-screen bg-black text-white flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-black/60 backdrop-blur-md fixed top-0 w-full z-50">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{movie?.name}</h1>
      </div>

      {/* Video */}
      <div className="flex-1 flex justify-center items-center">
        <video
          ref={videoRef}
          src={movie?.url}
          autoPlay
          controls={false}
          className="w-full max-h-screen"
          controlsList="nodownload noremoteplayback" // disable download
          disablePictureInPicture // disable PIP
        />
      </div>

      {/* Progress Bar */}
      {/* Progress Bar */}
        <div className="px-6 py-3">
        
        {/* Time Row */}
        <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
            <span>{formatTime(duration)}</span>
        </div>

        {/* Range Slider */}
        <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-full accent-yellow-400 cursor-pointer"
        />
        </div>


      {/* Controls */}
      <div className="px-6 py-4 flex justify-center items-center gap-6 bg-black/70">

        <Button size="icon" onClick={() => skip(-10)}>
          <SkipBack className="w-6 h-6" />
        </Button>

        <Button size="icon" onClick={togglePlay}>
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>

        <Button size="icon" onClick={() => skip(10)}>
          <SkipForward className="w-6 h-6" />
        </Button>

        <Button size="icon" onClick={goFullscreen}>
          <Maximize className="w-6 h-6" />
        </Button>

      </div>
    </div>
  );
};

export default VideoPlayerPage;
