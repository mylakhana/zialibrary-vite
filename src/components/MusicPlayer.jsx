import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpandedPlayer from "./ExpandedPlayer";
import {
  setCurrentTrack,
  togglePlay,
  setQueue,
  setVolume,
  setPlaybackSpeed,
  setCurrentTime,
  setDuration,
} from "../store/slices/playerSlice";
import ThemeSwitch from "./ThemeSwitch";

export default function MusicPlayer() {
  const dispatch = useDispatch();
  const {
    currentTrack,
    isPlaying,
    queue,
    volume,
    playbackSpeed,
    currentTime,
    duration,
  } = useSelector((state) => state.player);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(new Audio());

  const speeds = [1, 1.5, 2, 3];

  useEffect(() => {
    const audio = audioRef.current;

    // Set initial volume
    audio.volume = volume;

    // Event listeners
    const handleTimeUpdate = () => {
      dispatch(setCurrentTime(audio.currentTime));
    };

    const handleLoadedMetadata = () => {
      dispatch(setDuration(audio.duration));
    };

    const handleEnded = () => {
      // Play next track when current track ends
      const currentIndex = queue.findIndex(
        (track) => track.id === currentTrack.id
      );
      if (currentIndex < queue.length - 1) {
        dispatch(setCurrentTrack(queue[currentIndex + 1]));
      } else {
        dispatch(togglePlay());
        dispatch(setCurrentTime(0));
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [dispatch, queue, currentTrack]);

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack.audio_url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    audioRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    dispatch(togglePlay());
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    dispatch(setCurrentTime(newTime));
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    dispatch(setVolume(newVolume));
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      // If we're more than 3 seconds into the track, restart it
      audioRef.current.currentTime = 0;
      dispatch(setCurrentTime(0));
    } else {
      // Otherwise, go to previous track
      const currentIndex = queue.findIndex(
        (track) => track.id === currentTrack.id
      );
      if (currentIndex > 0) {
        dispatch(setCurrentTrack(queue[currentIndex - 1]));
      }
    }
  };

  const handleNext = () => {
    const currentIndex = queue.findIndex(
      (track) => track.id === currentTrack.id
    );
    if (currentIndex < queue.length - 1) {
      dispatch(setCurrentTrack(queue[currentIndex + 1]));
    }
  };

  const handleSpeedChange = () => {
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const nextSpeed = speeds[nextIndex];
    dispatch(setPlaybackSpeed(nextSpeed));
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      <div
        style={{ zIndex: 1000 }}
        className="fixed bottom-0 left-0 right-0 bg-surface-container-high/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-300/50 dark:border-gray-700/50 p-4"
      >
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          {/* Track Info */}
          <div 
            className="flex items-center space-x-4 w-1/4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsExpanded(true)}
          >
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-14 h-14 rounded-md"
            />
            <div>
              <h4 className="text-sm font-medium">{currentTrack.title}</h4>
              <p className="text-xs text-gray-400">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center w-2/4">
            <div className="flex items-center space-x-6 mb-2">
              <button
                onClick={handlePrevious}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>
              <button
                onClick={handlePlayPause}
                className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button
                onClick={handleNext}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6l-12 12M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-2 w-full">
              <span className="text-xs text-gray-400">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={isNaN(duration) ? 0 : (currentTime / duration) * 100}
                onChange={handleProgressChange}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-gray-400">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control, Speed Control, and Expand Button */}
          <div className="flex items-center space-x-4 w-1/4 justify-end">
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-white">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Speed Control Pill */}
            <button
              onClick={handleSpeedChange}
              className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full text-sm font-medium hover:bg-surface-container-high transition-colors"
            >
              {playbackSpeed}x
            </button>

            <ThemeSwitch />
          </div>
        </div>
      </div>

      {/* Expanded Player View */}
      {isExpanded && (
        <ExpandedPlayer
          currentTrack={currentTrack}
          onClose={() => setIsExpanded(false)}
        />
      )}
    </>
  );
}
