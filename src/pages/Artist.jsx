import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrackCard from "../components/TrackCard";

function Artist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);

  // Dummy data for demonstration
  useEffect(() => {
    // Simulate API call to get artist data
    const artistData = {
      id: id,
      name: "Sheikh Mishary Rashid Alafasy",
      subtitle: "Quran Reciter",
      description: "Renowned Quran reciter with a beautiful voice and proper tajweed. Imam of the Grand Mosque in Kuwait and Director of the International Holy Quran Radio.",
      image: "/images/patterns/islamic-pattern-hero.svg",
      followers: "2.5M",
      categories: [
        { id: "all", title: "All Tracks" },
        { id: "quran", title: "Quran Recitations" },
        { id: "nasheeds", title: "Nasheeds" },
        { id: "duas", title: "Duas" },
        { id: "lectures", title: "Lectures" },
      ],
    };

    const albumsData = [
      {
        id: 1,
        title: "Complete Quran",
        subtitle: "Full Quran Recitation",
        description: "Complete recitation of the Holy Quran",
        image: "/images/patterns/islamic-pattern-album-1.svg",
        trackCount: 114,
      },
      {
        id: 2,
        title: "Selected Surahs",
        subtitle: "Most Popular Surahs",
        description: "Collection of frequently recited surahs",
        image: "/images/patterns/islamic-pattern-album-2.svg",
        trackCount: 20,
      },
      {
        id: 3,
        title: "Beautiful Duas",
        subtitle: "Collection of Duas",
        description: "Collection of beautiful duas and supplications",
        image: "/images/patterns/islamic-pattern-album-3.svg",
        trackCount: 15,
      },
    ];

    const tracksData = [
      {
        id: 1,
        title: "Surah Al-Fatiha",
        artist: "Sheikh Mishary Rashid Alafasy",
        duration: "3:45",
        image: "/images/patterns/islamic-pattern-track-1.svg",
        category: "quran",
      },
      {
        id: 2,
        title: "Surah Al-Baqarah (1-141)",
        artist: "Sheikh Mishary Rashid Alafasy",
        duration: "45:20",
        image: "/images/patterns/islamic-pattern-track-2.svg",
        category: "quran",
      },
      {
        id: 3,
        title: "Beautiful Dua for Forgiveness",
        artist: "Sheikh Mishary Rashid Alafasy",
        duration: "5:15",
        image: "/images/patterns/islamic-pattern-track-3.svg",
        category: "duas",
      },
      // Add more tracks...
    ];

    setArtist(artistData);
    setAlbums(albumsData);
    setTracks(tracksData);
  }, [id]);

  const handlePlayTrack = (track) => {
    // TODO: Implement play functionality
    console.log("Playing track:", track);
  };

  const filteredTracks = selectedCategory === "all"
    ? tracks
    : tracks.filter(track => track.category === selectedCategory);

  if (!artist) {
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
              className="bg-surface-container text-on-surface-variant p-3 rounded-full hover:bg-surface-container-high transition-colors shadow-lg mb-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">{artist.name}</h1>
            <p className="text-xl text-gray-300 mb-2">{artist.subtitle}</p>
            <p className="text-gray-400">{artist.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
            {artist.categories.map((category) => (
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

        {/* Popular Albums */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Popular Albums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <div
                key={album.id}
                onClick={() => navigate(`/album/${album.id}`)}
                className="bg-surface-container rounded-2xl overflow-hidden hover:bg-surface-container-high transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group"
              >
                <div className="aspect-square relative bg-primary/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-24 h-24 text-primary/20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-1">{album.title}</h3>
                    <p className="text-sm text-gray-300 mb-2">{album.subtitle}</p>
                    <p className="text-sm text-gray-400 mb-3">{album.description}</p>
                    <div className="flex items-center text-sm text-gray-300">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                      {album.trackCount} Tracks
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

export default Artist; 