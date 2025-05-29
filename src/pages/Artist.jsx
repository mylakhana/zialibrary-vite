import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TrackCard from "../components/TrackCard";
import {
  handleGetArtistGenres,
  handleGetArtistTracks,
} from "../services/api_helper";
import { setCurrentTrack, setQueue } from "../store/slices/playerSlice";
import { fixUrl } from "../components/CustomElements";

function Artist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { genres, artists } = useSelector((state) => state.data);
  
  const [artist, setArtist] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artistGenres, setArtistGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Find and set the current artist from Redux store
    const foundArtist = artists.data.find((a) => a.id === parseInt(id));
    if (foundArtist) {
      setArtist({
        ...foundArtist,
        categories: [
          { id: "all", title: "All Tracks" },
          { id: "popular", title: "Popular" },
          { id: "recent", title: "Recent" },
        ],
      });
    }
  }, [id, artists.data]);

  useEffect(() => {
    if (!artist) return;

    // Fetch artist genres
    handleGetArtistGenres(
      id,
      (res) => {
        // Map genre IDs to full genre objects
        const genreObjects = res.data.map(genreId => 
          genres.data.find(g => g.id === genreId)
        ).filter(Boolean); // Remove any undefined values
        setArtistGenres(genreObjects);
      },
      (error) => {
        console.error("Error fetching artist genres:", error);
      },
      setIsLoading
    );

    // Fetch initial tracks (all)
    handleGetArtistTracks(
      {
        id: id,
        filter: "all",
      },
      (res) => {
        setTracks(res.data);
      },
      (error) => {
        console.error("Error fetching artist tracks:", error);
      },
      setIsLoading
    );
  }, [id, artist, genres.data]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    
    // If it's a genre ID (number), use it as genre_id
    const isGenre = typeof categoryId === 'number';
    
    handleGetArtistTracks(
      {
        id: id,
        filter: isGenre ? "all" : categoryId,
        genre_id: isGenre ? categoryId : null,
      },
      (res) => {
        setTracks(res.data);
      },
      (error) => {
        console.error("Error fetching tracks:", error);
      },
      setIsLoading
    );
  };

  const handlePlayTrack = (track) => {
    console.log(track);
    dispatch(setCurrentTrack({
      id: track.id,
      title: track.title,
      artist: track.artist,
      cover: fixUrl(track.cover),
      audio_url: fixUrl(track.url),
    }));

    // Set the queue with all tracks from the current section
    const queue = tracks.map(track => ({
      id: track.id,
      title: track.title,
      artist: track.artist,
      cover: fixUrl(track.cover),
      audio_url: fixUrl(track.url),
    }));
    dispatch(setQueue(queue));
  };

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
          <div className="w-48 h-48 rounded-full overflow-hidden">
            <img
              src={fixUrl(artist.cover) || "/default-artist.png"}
              alt={artist.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="bg-surface-container text-on-surface p-3 rounded-full hover:bg-surface-container-high transition-colors shadow-lg mb-4"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">
              {artist.title}
              {artist.short_title && (
                <span className="text-gray-300 text-sm mx-2">
                  ({artist.short_title})
                </span>
              )}
            </h1>
            <p className="text-xl text-gray-300 mb-2">{artist.subtitle || "Artist"}</p>
            <p className="text-gray-400">{artist.bio || ""}</p>
            <p className="text-gray-400">
              {artist.tracks} tracks
            </p>
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
                onClick={() => handleCategoryClick(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {category.title}
              </button>
            ))}
            {artistGenres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleCategoryClick(genre.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === genre.id
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {genre.title}
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
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-1">{album.title}</h3>
                    <p className="text-sm text-gray-300 mb-2">
                      {album.subtitle}
                    </p>
                    <p className="text-sm text-gray-400 mb-3">
                      {album.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                        />
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
          <h2 className="text-2xl font-bold mb-4">Tracks</h2>
          <div className="bg-surface-container rounded-xl overflow-hidden">
            {isLoading ? (
              <div className="p-8 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              tracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  onPlay={() => handlePlayTrack(track)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
