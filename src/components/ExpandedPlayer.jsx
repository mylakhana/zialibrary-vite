import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTrack } from "../store/slices/playerSlice";
import { fixUrl } from "./CustomElements";
import { handleGetTrackArts } from "../services/api_helper";

function ExpandedPlayer({ onClose }) {
  const dispatch = useDispatch();
  const { currentTrack, queue } = useSelector((state) => state.player);
  const [trackArt, setTrackArt] = useState(null);

  useEffect(() => {
    const fetchTrackArt = async () => {
      if (!currentTrack?.id) return;
      
      try {
        await handleGetTrackArts(
          { ids: `[${currentTrack.id}]` },
          (res) => {
            if (res.success && res.data && res.data[currentTrack.id]) {
              setTrackArt(fixUrl(res.data[currentTrack.id]));
            }
          },
          (error) => {
            console.error("Error fetching track art:", error);
          }
        );
      } catch (error) {
        console.error("Error in track art fetch:", error);
      }
    };

    fetchTrackArt();
  }, [currentTrack?.id]);

  const handleTrackClick = (track) => {
    dispatch(setCurrentTrack(track));
  };

  return (
    <div className="fixed inset-0 bg-gray-200/90 dark:bg-gray-900/90 backdrop-blur-sm z-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold">Now Playing</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Album Art and Info */}
          <div className="w-1/2 p-8 flex flex-col items-center justify-center">
            <div className="w-96 h-96 mb-8">
              {trackArt ? (
                <img
                  src={trackArt}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
              ) : (
                <div className="w-full h-full bg-primary/5 rounded-lg shadow-2xl flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-primary/20"
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
              )}
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">{currentTrack.title}</h3>
              <p className="text-gray-400">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Right Side - Playlist */}
          <div className="w-1/2 border-l border-gray-800 overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Up Next</h3>
              <div className="space-y-2">
                {queue.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => handleTrackClick(track)}
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
                      track.id === currentTrack.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-surface-container-high"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-primary/5">
                      <div className="w-full h-full flex items-center justify-center">
                        {trackArt ? (
                          <img
                            src={trackArt}
                            alt={track.title}
                            className="w-full h-full object-cover rounded-lg shadow-2xl"
                          />
                        ) : (
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
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{track.title}</h4>
                      <p className="text-sm text-on-surface-variant truncate">
                        {track.artist}
                      </p>
                    </div>
                    {track.id === currentTrack.id && (
                      <div className="text-primary">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpandedPlayer; 