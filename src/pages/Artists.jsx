import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Artists() {
  const navigate = useNavigate();

  // Dummy data for demonstration
  const artists = [
    {
      id: 1,
      name: "Sheikh Mishary Rashid Alafasy",
      subtitle: "Quran Reciter",
      description: "Renowned Quran reciter with a beautiful voice and proper tajweed",
      image: "/images/patterns/islamic-pattern-1.svg",
      albumsCount: 12,
      followers: "2.5M",
    },
    {
      id: 2,
      name: "Sheikh Abdul Rahman Al-Sudais",
      subtitle: "Quran Reciter",
      description: "Imam of the Grand Mosque in Makkah",
      image: "/images/patterns/islamic-pattern-2.svg",
      albumsCount: 8,
      followers: "1.8M",
    },
    {
      id: 3,
      name: "Sheikh Ayman Swaid",
      subtitle: "Islamic Scholar",
      description: "Expert in Quranic sciences and tajweed",
      image: "/images/patterns/islamic-pattern-3.svg",
      albumsCount: 15,
      followers: "950K",
    },
    {
      id: 4,
      name: "Sheikh Saad Al-Ghamdi",
      subtitle: "Quran Reciter",
      description: "Known for his unique style of recitation",
      image: "/images/patterns/islamic-pattern-4.svg",
      albumsCount: 10,
      followers: "1.2M",
    },
    {
      id: 5,
      name: "Sheikh Maher Al-Muaiqly",
      subtitle: "Quran Reciter",
      description: "Imam of the Grand Mosque in Madinah",
      image: "/images/patterns/islamic-pattern-5.svg",
      albumsCount: 7,
      followers: "1.5M",
    },
    {
      id: 6,
      name: "Sheikh Abdullah Al-Juhany",
      subtitle: "Quran Reciter",
      description: "Known for his melodious voice and emotional recitation",
      image: "/images/patterns/islamic-pattern-6.svg",
      albumsCount: 9,
      followers: "800K",
    },
  ];

  const handleArtistClick = (artist) => {
    navigate(`/artist/${artist.id}`);
  };

  return (
    <div className="min-h-screen bg-surface p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-surface-container text-on-surface-variant p-3 rounded-full hover:bg-surface-container-high transition-colors shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-4xl font-bold">Artists</h1>
        </div>
      </div>

      {/* Artists Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <div
              key={artist.id}
              onClick={() => handleArtistClick(artist)}
              className="bg-surface-container rounded-2xl overflow-hidden hover:bg-surface-container-high transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group"
            >
              <div className="aspect-square relative bg-primary/5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary/20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h2 className="text-2xl font-bold mb-1">{artist.name}</h2>
                  <p className="text-sm text-gray-300 mb-2">{artist.subtitle}</p>
                  <p className="text-sm text-gray-400 mb-3">{artist.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                      {artist.albumsCount} Albums
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {artist.followers} Followers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Artists; 