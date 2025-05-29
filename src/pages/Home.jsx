import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { PageHeader, fixUrl } from "../components/CustomElements";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import TrackCard from "../components/TrackCard";
import ThemeSwitch from "../components/ThemeSwitch";
import { handleGetHomeData } from "../services/api_helper";
import { setCurrentTrack, setQueue } from "../store/slices/playerSlice";

function Home() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const darkMode = localStorage.getItem("theme") === "dark";
  const [homeData, setHomeData] = useState({
    featured_artists: [],
    featured_albums: [],
    featured_playlist: [],
    featured_tracks: [],
  });

  const handlePlayTrack = (track) => {
    dispatch(setCurrentTrack({
      id: track.id,
      title: track.title,
      artist: track.artist,
      cover: fixUrl(track.cover),
      audio_url: fixUrl(track.url),
    }));

    // Set the queue with all tracks from the current section
    const queue = homeData.featured_tracks.map(track => ({
      id: track.id,
      title: track.title,
      artist: track.artist,
      cover: fixUrl(track.cover),
      audio_url: fixUrl(track.url),
    }));
    dispatch(setQueue(queue));
  };

  const handleArtistClick = (artist) => {
    navigate(`/artist/${artist.id}`);
  };

  useEffect(() => {
    document.title = "Zia Library - Home";
    handleGetHomeData(
      (res) => {
        setHomeData(res.data);
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
        setError("Failed to load homepage data");
        setIsLoading(false);
      }
    );
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-surface-container p-6">
        <div className="mb-8">
          <img
            src={darkMode ? "/logo_wh.png" : "/logo_bk.png"}
            alt="Zia Library Logo"
            className="h-40 w-40 mx-auto"
          />
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/search"
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/albums"
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Albums
              </Link>
            </li>
            <li>
              <Link
                to="/artists"
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Artists
              </Link>
            </li>
            <li>
              <Link
                to="/genres"
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Genres
              </Link>
            </li>
          </ul>
        </nav>

        {/* Theme Switch */}
        <div className="absolute bottom-8 left-6 mb-20">
          <ThemeSwitch />
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Featured Artists Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-on-surface">
            Featured Artists
          </h2>
          <div className="relative">
            {/* Scroll Shadow Indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-surface to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface to-transparent pointer-events-none z-10" />

            {/* Scrollable Container */}
            <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
              {homeData.featured_artists.map((artist) => (
                <div
                  key={artist.id}
                  onClick={() => handleArtistClick(artist)}
                  className="flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer group"
                >
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-r from-primary via-primary-variant to-primary">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          src={fixUrl(artist.cover) || "/default-artist.png"}
                          alt={artist.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-surface bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  </div>
                  <span className="text-sm text-on-surface-variant">
                    {artist.short_title || artist.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Albums Section */}
        <div className="mb-8">
          {homeData.featured_playlist && (
            <Link
              to={`/album/${homeData.featured_playlist.id}`}
              className="block relative h-80 rounded-lg overflow-hidden hover:opacity-95 transition-opacity"
            >
              <img
                src={fixUrl(homeData.featured_playlist.album_art)}
                alt={homeData.featured_playlist.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-white dark:from-black to-transparent w-full">
                <h2 className="text-4xl font-bold mb-2 text-white">
                  {homeData.featured_playlist.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {homeData.featured_playlist.description}
                </p>
              </div>
            </Link>
          )}

          <h2 className="text-xl font-semibold mb-4 text-on-surface">
            Featured Albums
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {homeData.featured_albums.map((album) => (
              <Link
                key={album.id}
                to={`/album/${album.id}`}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg hover:bg-surface-container-high transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="aspect-square mb-4 relative group">
                  <img
                    src={fixUrl(album.album_art) || "/default-album.png"}
                    alt={album.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-surface bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <button className="bg-primary text-on-primary rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-on-surface">{album.title}</h3>
                <p className="text-sm text-on-surface-variant">
                  {album.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Tracks Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-on-surface">
            Featured Tracks
          </h2>
          <div className="space-y-4">
            {homeData.featured_tracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onPlay={() => handlePlayTrack(track)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
