// src/layouts/MainLayout.jsx
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import MusicPlayer from "../components/MusicPlayer";
import { handleGetArtists, handleGetGenre } from "../services/api_helper";
import {
  setGenres,
  setGenresLoading,
  setGenresError,
  setArtists,
  setArtistsLoading,
  setArtistsError,
} from "../store/slices/dataSlice";

function MainLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGenres = async () => {
      dispatch(setGenresLoading(true));
      try {
        await handleGetGenre(
          (res) => {
            if (res.success && res.data) {
              // Transform the data to match our UI needs
              const transformedGenres = res.data.map(genre => ({
                id: genre.id,
                title: genre.title,
                subtitle: `${genre.tracks} Tracks`,
                description: `Explore our collection of ${genre.title.toLowerCase()} with ${genre.tracks} tracks`,
                image: "/images/patterns/islamic-pattern-1.svg", // Default pattern
                trackCount: genre.tracks,
              }));
              dispatch(setGenres(transformedGenres));
            }
          },
          (error) => {
            console.error("Error fetching genres:", error);
            dispatch(setGenresError(error.message || "Failed to fetch genres"));
          }
        );

        dispatch(setArtistsLoading(true));
        await handleGetArtists(
          (res) => {
            dispatch(setArtists(res.data));
          },
          (error) => {
            console.error("Error fetching artists:", error);
            dispatch(setArtistsError(error.message || "Failed to fetch artists"));
          }
        );
      } catch (error) {
        console.error("Error in genre fetch:", error);
        dispatch(setGenresError(error.message || "Failed to fetch genres"));
      }
    };

    fetchGenres();
  }, [dispatch]);

  return (
    <div className="bg-[radial-gradient(circle_at_top_center,_#ee3f3622_10%,_transparent_60%)] dark:bg-[radial-gradient(circle_at_top_center,_#ee3f363c_10%,_transparent_60%)]">
      <div className="flex h-screen">

        {/* Main Content */}
        <div className="flex-1 overflow-auto pb-24">
          <Outlet />
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
}

export default MainLayout;
