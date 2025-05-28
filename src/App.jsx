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
import Album from "./pages/Album";
import Search from "./pages/Search";
import Albums from "./pages/Albums";
import CategoryAlbums from "./pages/CategoryAlbums";
import Artists from "./pages/Artists";
import Artist from "./pages/Artist";
import Genres from "./pages/Genres";
import Genre from "./pages/Genre";

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
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/category/:categoryId" element={<CategoryAlbums />} />
          <Route path="/album/:id" element={<Album />} />
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
