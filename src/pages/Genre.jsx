import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrackCard from "../components/TrackCard";

function Genre() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genre, setGenre] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);

  // Dummy data for demonstration
  useEffect(() => {
    // Simulate API call to get genre data
    const genreData = {
      id: id,
      title: "Quran Recitations",
      subtitle: "Beautiful Quran Recitations",
      description: "Collection of beautiful Quran recitations by renowned reciters. Listen to the melodious voices of famous Quran reciters from around the world.",
      image: "/images/patterns/islamic-pattern-hero.svg",
      trackCount: 250,
      artistCount: 15,
      categories: [
        { id: "all", title: "All Tracks" },
        { id: "popular", title: "Popular" },
        { id: "recent", title: "Recent" },
        { id: "favorites", title: "Favorites" },
      ],
    };

    const artistsData = [
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
        name: "Sheikh Maher Al-Muaiqly",
        subtitle: "Quran Reciter",
        description: "Imam of the Grand Mosque in Madinah",
        image: "/images/patterns/islamic-pattern-3.svg",
        albumsCount: 7,
        followers: "1.5M",
      },
    ];

    const tracksData = [
      {
        id: 1,
        title: "Surah Al-Fatiha",
        artist: "Sheikh Mishary Rashid Alafasy",
        duration: "3:45",
        image: "/images/patterns/islamic-pattern-track-1.svg",
        category: "popular",
      },
      {
        id: 2,
        title: "Surah Al-Baqarah (1-141)",
        artist: "Sheikh Abdul Rahman Al-Sudais",
        duration: "45:20",
        image: "/images/patterns/islamic-pattern-track-2.svg",
        category: "popular",
      },
      {
        id: 3,
        title: "Surah Yasin",
        artist: "Sheikh Maher Al-Muaiqly",
        duration: "15:30",
        image: "/images/patterns/islamic-pattern-track-3.svg",
        category: "recent",
      },
    ];

    setGenre(genreData);
    setArtists(artistsData);
    setTracks(tracksData);
  }, [id]);

  const handlePlayTrack = (track) => {
    // TODO: Implement play functionality
    console.log("Playing track:", track);
  };

  const filteredTracks = selectedCategory === "all"
    ? tracks
    : tracks.filter(track => track.category === selectedCategory);

  if (!genre) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="relative h-80">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-48 h-48 text-primary/10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="bg-surface-container text-on-surface p-3 rounded-full hover:bg-surface-container-high transition-colors shadow-lg mb-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">{genre.title}</h1>
            <p className="text-xl text-gray-300 mb-2">{genre.subtitle}</p>
            <p className="text-gray-400">{genre.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
            {genre.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Artists */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Popular Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist) => (
              <div
                key={artist.id}
                onClick={() => navigate(`/artist/${artist.id}`)}
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
                    <h3 className="text-xl font-bold mb-1">{artist.name}</h3>
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

        {/* Tracks List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Popular Tracks</h2>
          <div className="bg-surface-container rounded-xl overflow-hidden">
            {filteredTracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onPlay={handlePlayTrack}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Genre; 