import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Genres() {
  const navigate = useNavigate();

  // Dummy data for demonstration
  const genres = [
    {
      id: 1,
      title: "Quran Recitations",
      subtitle: "Beautiful Quran Recitations",
      description: "Collection of beautiful Quran recitations by renowned reciters",
      image: "/images/patterns/islamic-pattern-1.svg",
      trackCount: 250,
      artistCount: 15,
    },
    {
      id: 2,
      title: "Nasheeds",
      subtitle: "Islamic Songs",
      description: "Collection of beautiful Islamic nasheeds and songs",
      image: "/images/patterns/islamic-pattern-2.svg",
      trackCount: 180,
      artistCount: 20,
    },
    {
      id: 3,
      title: "Duas",
      subtitle: "Supplications",
      description: "Collection of beautiful duas and supplications",
      image: "/images/patterns/islamic-pattern-3.svg",
      trackCount: 120,
      artistCount: 10,
    },
    {
      id: 4,
      title: "Lectures",
      subtitle: "Islamic Lectures",
      description: "Collection of Islamic lectures and talks",
      image: "/images/patterns/islamic-pattern-4.svg",
      trackCount: 300,
      artistCount: 25,
    },
    {
      id: 5,
      title: "Tajweed",
      subtitle: "Quranic Rules",
      description: "Learn the rules of proper Quran recitation",
      image: "/images/patterns/islamic-pattern-5.svg",
      trackCount: 80,
      artistCount: 8,
    },
    {
      id: 6,
      title: "Tafsir",
      subtitle: "Quranic Exegesis",
      description: "Detailed explanations of Quranic verses",
      image: "/images/patterns/islamic-pattern-6.svg",
      trackCount: 150,
      artistCount: 12,
    },
  ];

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre.id}`);
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
          <h1 className="text-4xl font-bold">Genres</h1>
        </div>
      </div>

      {/* Genres Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((genre) => (
            <div
              key={genre.id}
              onClick={() => handleGenreClick(genre)}
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
                  <h2 className="text-2xl font-bold mb-1">{genre.title}</h2>
                  <p className="text-sm text-gray-300 mb-2">{genre.subtitle}</p>
                  <p className="text-sm text-gray-400 mb-3">{genre.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                      {genre.trackCount} Tracks
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {genre.artistCount} Artists
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

export default Genres; 