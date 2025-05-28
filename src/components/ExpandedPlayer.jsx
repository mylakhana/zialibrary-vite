import { useState } from "react";

function ExpandedPlayer({ currentTrack, onClose }) {
  // Dummy playlist data
  const playlist = [
    { id: 1, title: "Track 1", artist: "Artist 1", duration: "3:45", isPlaying: true },
    { id: 2, title: "Track 2", artist: "Artist 2", duration: "4:20", isPlaying: false },
    { id: 3, title: "Track 3", artist: "Artist 3", duration: "3:15", isPlaying: false },
    { id: 4, title: "Track 4", artist: "Artist 4", duration: "5:10", isPlaying: false },
    { id: 5, title: "Track 5", artist: "Artist 5", duration: "3:55", isPlaying: false },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold">Now Playing</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2"
          >
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
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
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
                {playlist.map((track) => (
                  <div
                    key={track.id}
                    className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 cursor-pointer ${
                      track.isPlaying ? "bg-gray-800" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-md"></div>
                      <div>
                        <h4 className="font-medium">{track.title}</h4>
                        <p className="text-sm text-gray-400">{track.artist}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{track.duration}</span>
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