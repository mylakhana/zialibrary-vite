import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleGetPlaylist } from "../services/api_helper";
import { fixUrl, NoResultsFound } from "../components/CustomElements";

function Playlist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (id) {
      handleGetPlaylist(
        { category: id },
        (response) => {
          console.log(response);
          setPlaylist(response.data);
          setAlbums(response.data.albums);
          setFilteredAlbums(response.data.albums);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
          setIsLoading(false);
        },
        setIsLoading
      );
    }
  }, [id]);

  useEffect(() => {
    const filtered = albums.filter((album) =>
      (album.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (album.subtitle?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (album.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );
    setFilteredAlbums(filtered);
  }, [searchQuery, albums]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-error">Error loading playlist</div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-error">Playlist not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="relative h-80">
        <img
          src={fixUrl(playlist.album_art)}
          alt={playlist.title}
          className="w-full h-full object-cover"
        />
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
            <h1 className="text-4xl font-bold text-white mb-2">{playlist.title}</h1>
            <p className="text-xl text-gray-300 mb-2">{playlist.subtitle}</p>
            <p className="text-gray-400">{playlist.description}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-8 mt-8">
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search albums..."
            className="w-full pl-10 pr-4 py-3 bg-surface-container text-on-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Albums Grid */}
      <div className="max-w-7xl mx-auto p-8">
        {filteredAlbums.length === 0 ? (
          <NoResultsFound message="No albums found" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlbums.map((album) => (
              <div
                key={album.id}
                onClick={() => navigate(`/album/${album.id}`)}
                className="bg-surface-container rounded-2xl overflow-hidden hover:bg-surface-container-high transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group"
              >
                <div className="aspect-square relative">
                  <img
                    src={fixUrl(album.album_art)}
                    alt={album.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h2 className="text-2xl font-bold mb-1">{album.title}</h2>
                    <p className="text-sm text-gray-300 mb-2">{album.subtitle}</p>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{album.description}</p>
                    <div className="flex items-center text-sm text-gray-300">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                      {album.tracks} Tracks
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Playlist; 