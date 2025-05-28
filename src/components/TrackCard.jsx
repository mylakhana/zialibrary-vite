import { useState } from "react";

function TrackCard({ track, onPlay }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handlePlay = () => {
    onPlay(track);
    setShowMenu(false);
  };

  const handleAddToQueue = () => {
    // TODO: Implement add to queue functionality
    console.log("Adding to queue:", track);
    setShowMenu(false);
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log("Downloading:", track);
    setShowMenu(false);
  };

  return (
    <div
      className="flex items-center gap-4 p-4 hover:bg-surface-container-high transition-colors group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Track Image */}
      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-primary/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-primary/20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium truncate">{track.title}</h3>
        <p className="text-sm text-on-surface-variant truncate">{track.artist}</p>
      </div>

      {/* Duration */}
      <div className="text-sm text-on-surface-variant">{track.duration}</div>

      {/* Play Button (visible on hover) */}
      <button
        onClick={handlePlay}
        className={`p-2 rounded-full bg-primary text-on-primary transition-all duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* More Options Button */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`p-2 rounded-full hover:bg-surface-container-high transition-colors ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-surface-container shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1 bg-surface-container">
              <button
                onClick={handlePlay}
                className="flex items-center w-full px-4 py-2 text-sm text-on-surface hover:bg-surface-container-high bg-surface-container"
              >
                <svg className="w-5 h-5 mr-3 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Play
              </button>
              <button
                onClick={handleAddToQueue}
                className="flex items-center w-full px-4 py-2 text-sm text-on-surface hover:bg-surface-container-high bg-surface-container"
              >
                <svg className="w-5 h-5 mr-3 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add to Queue
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center w-full px-4 py-2 text-sm text-on-surface hover:bg-surface-container-high bg-surface-container"
              >
                <svg className="w-5 h-5 mr-3 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download MP3
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackCard; 