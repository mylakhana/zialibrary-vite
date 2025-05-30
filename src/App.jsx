// WARNING: TRESPASSERS WILL BE ROUTED
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ComingSoon from "./components/ComingSoon";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlists from "./pages/Playlists";
import Artists from "./pages/Artists";
import Artist from "./pages/Artist";
import Genres from "./pages/Genres";
import Genre from "./pages/Genre";
import Playlist from "./pages/Playlist";
import Album from "./pages/Album";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Only the worthy may enter (or the persistent) */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/album/:id" element={<Album />} />
          {/* <Route path="/albums/category/:categoryId" element={<CategoryAlbums />} /> */}
          <Route path="artists" element={<Artists />} />
          <Route path="artist/:id" element={<Artist />} />
          <Route path="genres" element={<Genres />} />
          <Route path="genre/:id" element={<Genre />} />

          {/* The 404 dimension */}
          <Route path="*" element={<ComingSoon />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
