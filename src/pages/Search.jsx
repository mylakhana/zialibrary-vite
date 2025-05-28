import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TrackCard from "../components/TrackCard";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  // Dummy data for demonstration
  const searchResults = {
    all: [
      { id: 1, type: "album", title: "Album 1", artist: "Artist 1", image: "https://picsum.photos/200/200" },
      { id: 2, type: "artist", name: "Artist 2", image: "https://picsum.photos/200/201" },
      { id: 3, type: "playlist", title: "Playlist 1", creator: "User 1", image: "https://picsum.photos/200/202" },
      { id: 4, type: "track", title: "Track 1", artist: "Artist 3", duration: "3:45", image: "https://picsum.photos/200/203" },
      { id: 5, type: "track", title: "Track 2", artist: "Artist 4", duration: "4:20", image: "https://picsum.photos/200/204" },
      { id: 6, type: "playlist", title: "Playlist 2", creator: "User 2", image: "https://picsum.photos/200/205" },
    ],
    albums: [
      { id: 1, title: "Album 1", artist: "Artist 1", image: "https://picsum.photos/200/200" },
      { id: 4, title: "Album 2", artist: "Artist 3", image: "https://picsum.photos/200/203" },
    ],
    artists: [
      { id: 2, name: "Artist 2", image: "https://picsum.photos/200/201" },
      { id: 5, name: "Artist 4", image: "https://picsum.photos/200/204" },
    ],
    playlists: [
      { id: 3, title: "Playlist 1", creator: "User 1", image: "https://picsum.photos/200/202" },
      { id: 6, title: "Playlist 2", creator: "User 2", image: "https://picsum.photos/200/205" },
    ],
    tracks: [
      { id: 4, title: "Track 1", artist: "Artist 3", duration: "3:45", image: "https://picsum.photos/200/203" },
      { id: 5, title: "Track 2", artist: "Artist 4", duration: "4:20", image: "https://picsum.photos/200/204" },
      { id: 7, title: "Track 3", artist: "Artist 5", duration: "3:15", image: "https://picsum.photos/200/206" },
      { id: 8, title: "Track 4", artist: "Artist 6", duration: "5:10", image: "https://picsum.photos/200/207" },
    ],
  };

  // Featured tracks data
  const featuredTracks = [
    { id: 1, title: "Track 1", artist: "Artist 1", duration: "3:45", image: "https://picsum.photos/200/209" },
    { id: 2, title: "Track 2", artist: "Artist 2", duration: "4:20", image: "https://picsum.photos/200/210" },
    { id: 3, title: "Track 3", artist: "Artist 3", duration: "3:15", image: "https://picsum.photos/200/211" },
    { id: 4, title: "Track 4", artist: "Artist 4", duration: "5:10", image: "https://picsum.photos/200/212" },
    { id: 5, title: "Track 5", artist: "Artist 5", duration: "3:55", image: "https://picsum.photos/200/213" },
  ];

  const handlePlayTrack = (track) => {
    // TODO: Implement play functionality
    console.log("Playing track:", track);
  };

  useEffect(() => {
    document.title = "Search - Zia Library";
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 500);
  };

  const renderResultCard = (item) => {
    switch (item.type || activeTab) {
      case "album":
        return (
          <Link
            to={`/album/${item.id}`}
            className="bg-surface-container p-4 rounded-2xl hover:bg-surface-container-high transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="aspect-square mb-4 relative group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <button className="bg-primary text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <h3 className="font-medium mb-1">{item.title}</h3>
            <p className="text-sm text-on-surface-variant">{item.artist}</p>
          </Link>
        );

      case "artist":
        return (
          <div className="bg-surface-container p-4 rounded-2xl hover:bg-surface-container-high transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="aspect-square mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="font-medium text-center">{item.name}</h3>
            <p className="text-sm text-on-surface-variant text-center">Artist</p>
          </div>
        );

      case "playlist":
        return (
          <div className="bg-surface-container p-4 rounded-2xl hover:bg-surface-container-high transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="aspect-square mb-4 relative group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <button className="bg-primary text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <h3 className="font-medium mb-1">{item.title}</h3>
            <p className="text-sm text-on-surface-variant">By {item.creator}</p>
          </div>
        );

      case "track":
        return <TrackCard track={item} onPlay={handlePlayTrack} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface p-8">
      {/* Search Header */}
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
          <h1 className="text-4xl font-bold">Search</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="What do you want to listen to?"
            className="w-full bg-surface-container text-on-surface p-4 pl-12 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <svg
            className="w-6 h-6 text-on-surface-variant absolute left-4 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mt-6">
          {["all", "albums", "artists", "playlists", "tracks"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Tracks Section - Only show when no search query */}
      {!searchQuery && (
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Tracks</h2>
          <div className="bg-surface-container rounded-xl overflow-hidden">
            {featuredTracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onPlay={handlePlayTrack}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className={activeTab === "tracks" ? "" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"}>
            {searchResults[activeTab].map((item) => (
              <div key={item.id}>{renderResultCard(item)}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search; 