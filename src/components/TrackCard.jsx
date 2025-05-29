import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToQueue, removeFromQueue } from "../store/slices/playerSlice";
import { fixUrl } from "./CustomElements";

export default function TrackCard({ track, onPlay }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const currentTrack = useSelector((state) => state.player.currentTrack);
  const queue = useSelector((state) => state.player.queue);
  const isPlaying = currentTrack?.id === track.id;
  const isInQueue = queue.some((queueTrack) => queueTrack.id === track.id);

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handlePlay = () => {
    onPlay(track);
    setShowMenu(false);
  };

  const handleQueueAction = () => {
    if (isInQueue) {
      dispatch(removeFromQueue(track.id));
    } else {
      dispatch(addToQueue({
        id: track.id,
        title: track.title,
        artist: track.artist,
        cover: fixUrl(track.cover),
        audio_url: fixUrl(track.url),
      }));
    }
    setShowMenu(false);
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log("Downloading:", track);
    setShowMenu(false);
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 hover:bg-surface-container-high transition-colors group relative ${
        isPlaying ? "bg-primary/5" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Track Image */}
      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-primary/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-primary/20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
        </div>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium truncate">{track.title}</h3>
        <p className="text-sm text-on-surface-variant truncate">
          {track.artist}
        </p>
      </div>

      {/* Play Button (visible on hover or when playing) */}
      {(isHovered || isPlaying) && (
        <button
          onClick={handlePlay}
          className={`p-2 rounded-full ${
            isPlaying ? "bg-primary text-on-primary" : "bg-primary/10 text-primary"
          } transition-all duration-200`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}

      {/* Duration */}
      <div className="text-sm text-on-surface-variant">
        {formatDuration(track.duration)}
      </div>

      <Dropdown>
        <DropdownTrigger>
          <Button variant="flat" isIconOnly>
            <svg
              className="w-5 h-5 text-on-surface-variant"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem onPress={handlePlay} key="play">Play</DropdownItem>
          <DropdownItem 
            onPress={handleQueueAction} 
            key="queue"
            className={isInQueue ? "text-danger" : ""}
          >
            {isInQueue ? "Remove from Queue" : "Add to Queue"}
          </DropdownItem>
          <DropdownItem onPress={handleDownload} key="download">Download MP3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
