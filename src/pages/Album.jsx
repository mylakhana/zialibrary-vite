import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Album() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Dummy data for demonstration
  const albumData = {
    id: id,
    title: "Album Title",
    artist: "Artist Name",
    cover: "https://picsum.photos/800/800",
    releaseDate: "2024",
    genre: "Pop",
    tracks: [
      { id: 1, title: "Track 1", duration: "3:45", isPlaying: false },
      { id: 2, title: "Track 2", duration: "4:20", isPlaying: false },
      { id: 3, title: "Track 3", duration: "3:15", isPlaying: false },
      { id: 4, title: "Track 4", duration: "5:10", isPlaying: false },
      { id: 5, title: "Track 5", duration: "3:55", isPlaying: false },
    ],
    description: "This is a sample album description that provides context about the music and its creation.",
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
    document.title = `${albumData.title} - Zia Library`;
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-surface-container text-on-surface-variant p-3 rounded-full hover:bg-surface-container-high transition-colors shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={albumData.cover}
            alt={albumData.title}
            className="w-full h-full object-cover blur-xl opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface"></div>
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end pb-8">
          <div className="flex items-end space-x-6">
            <div className="w-48 h-48 rounded-2xl shadow-2xl overflow-hidden">
              <img
                src={albumData.cover}
                alt={albumData.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{albumData.title}</h1>
              <p className="text-lg text-on-surface-variant mb-4">{albumData.artist}</p>
              <div className="flex items-center space-x-4 text-sm text-on-surface-variant">
                <span>{albumData.releaseDate}</span>
                <span>•</span>
                <span>{albumData.genre}</span>
                <span>•</span>
                <span>{albumData.tracks.length} songs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Action Buttons */}
        <div className="flex items-center space-x-4 mb-8">
          <button className="bg-primary text-on-primary px-8 py-3 rounded-full font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors">
            Play All
          </button>
          <button className="bg-surface-variant text-on-surface-variant px-6 py-3 rounded-full font-medium hover:bg-surface-variant/80 transition-colors">
            Shuffle
          </button>
          <button className="text-on-surface-variant hover:text-on-surface p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-on-surface-variant mb-8 max-w-2xl">
          {albumData.description}
        </p>

        {/* Track List */}
        <div className="bg-surface-container rounded-2xl overflow-hidden">
          {albumData.tracks.map((track, index) => (
            <div
              key={track.id}
              className="flex items-center p-4 hover:bg-surface-container-high transition-colors group"
            >
              <div className="w-12 text-center text-on-surface-variant">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{track.title}</h3>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-on-surface-variant">{track.duration}</span>
                <button className="text-on-surface-variant hover:text-on-surface p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Album; 