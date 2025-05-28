import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrackCard from "../components/TrackCard";

function Album() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [selectedSubalbum, setSelectedSubalbum] = useState(null);
  const [tracks, setTracks] = useState([]);

  // Dummy data for demonstration
  useEffect(() => {
    // Simulate API call to get album and tracks
    const albumData = {
      id: id,
      title: "Complete Quran",
      subtitle: "By Sheikh Mishary Rashid Alafasy",
      description: "Complete recitation of the Holy Quran with beautiful voice and proper tajweed",
      image: "https://picsum.photos/800/400",
      trackCount: 114,
      subalbums: [
        { id: "all", title: "All Surahs" },
        { id: "juz1", title: "Juz 1" },
        { id: "juz2", title: "Juz 2" },
        { id: "juz3", title: "Juz 3" },
        { id: "juz4", title: "Juz 4" },
        { id: "juz5", title: "Juz 5" },
      ],
    };

    const tracksData = [
      {
        id: 1,
        title: "Surah Al-Fatiha",
        artist: "Sheikh Mishary Rashid Alafasy",
        duration: "3:45",
        image: "https://picsum.photos/200/200",
        juz: "juz1",
      },
      {
        id: 2,
        title: "Surah Al-Baqarah (1-141)",
        artist: "Sheikh Mishary Rashid Alafasy",
        duration: "45:20",
        image: "https://picsum.photos/200/201",
        juz: "juz1",
      },
      {
        id: 3,
        title: "Surah Al-Baqarah (142-252)",
        artist: "Sheikh Mishary Rashid Alafasy",
        duration: "42:15",
        image: "https://picsum.photos/200/202",
        juz: "juz2",
      },
      // Add more tracks...
    ];

    setAlbum(albumData);
    setTracks(tracksData);
    setSelectedSubalbum("all");
  }, [id]);

  const handlePlayTrack = (track) => {
    // TODO: Implement play functionality
    console.log("Playing track:", track);
  };

  const filteredTracks = selectedSubalbum === "all"
    ? tracks
    : tracks.filter(track => track.juz === selectedSubalbum);

  if (!album) {
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
        <img
          src={album.image}
          alt={album.title}
          className="w-full h-full object-cover"
        />
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
            <h1 className="text-4xl font-bold text-white mb-2">{album.title}</h1>
            <p className="text-xl text-gray-300 mb-2">{album.subtitle}</p>
            <p className="text-gray-400">{album.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Subalbums */}
        <div className="mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
            {album.subalbums.map((subalbum) => (
              <button
                key={subalbum.id}
                onClick={() => setSelectedSubalbum(subalbum.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedSubalbum === subalbum.id
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {subalbum.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tracks List */}
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
  );
}

export default Album; 