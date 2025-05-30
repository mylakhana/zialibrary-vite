import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TrackCard from "../components/TrackCard";
import {
  handleGetAlbumDetails,
  handleGetAlbumTracks,
  handleGetSubAlbums,
  handleGetTrackArts,
} from "../services/api_helper";
import { setCurrentTrack, setQueue } from "../store/slices/playerSlice";
import { fixUrl } from "../components/CustomElements";

function Album() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [album, setAlbum] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAlbumDetails = () => {
    handleGetAlbumDetails(
      { id: id },
      (res) => {
        res.data.categories = [];
        setAlbum(res.data);
        fetchSubAlbums();
      },
      (error) => {
        console.error("Error fetching album details:", error);
      },
      setIsLoading
    );
  };

  console.log(album);

  const fetchSubAlbums = () => {
    handleGetSubAlbums(
      { id: id },
      (res) => {
        if (res.data.length > 0) {
          setCategories(res.data);
          setSelectedCategory(res.data[0]);
          handleCategoryClick(res.data[0]);
        }
      },
      (error) => {
        console.error("Error fetching sub albums:", error);
      },
      setIsLoading
    );
  };

  useEffect(() => {
    // Fetch album details
    fetchAlbumDetails();
  }, [id]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);

    let data = {
      id: id,
    };
    if (categoryId) {
      data.filter = categoryId;
    }

    handleGetAlbumTracks(
      data,
      (res) => {
        setTracks(res.data.map((track) => ({
          ...track,
          cover: album?.album_art,
        })));
        // Fetch track arts in bulk for new tracks
        const trackIds = res.data.map((track) => track.id);
        handleGetTrackArts(
          { ids: `[${trackIds.join(",")}]` },
          (artRes) => {
            if (artRes.success && artRes.data) {
              // Update tracks with their arts
              setTracks((prevTracks) =>
                prevTracks.map((track) => ({
                  ...track,
                  cover: artRes.data[track.id]
                    ? fixUrl(artRes.data[track.id])
                    : fixUrl(track.cover),
                }))
              );
            }
          },
          (error) => {
            console.error("Error fetching track arts:", error);
          }
        );
      },
      (error) => {
        console.error("Error fetching tracks:", error);
      },
      setIsLoading
    );
  };

  const handlePlayTrack = (track) => {
    dispatch(
      setCurrentTrack({
        id: track.id,
        title: track.title,
        artist: track.artist,
        cover: track.cover,
        audio_url: fixUrl(track.url),
      })
    );

    // Set the queue with all tracks from the current section
    const queue = tracks.map((track) => ({
      id: track.id,
      title: track.title,
      artist: track.artist,
      cover: track.cover,
      audio_url: fixUrl(track.url),
    }));
    dispatch(setQueue(queue));
  };

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
          src={fixUrl(album.album_art)}
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
              {album.title}
            </h1>
            <p className="text-xl text-gray-300 mb-2">{album.subtitle}</p>
            <p className="text-gray-400">{album.description}</p>
            <p className="text-gray-400">{album.tracks} tracks</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {category ?? 'All Items'}
              </button>
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

export default Album;
