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

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Only the worthy may enter (or the persistent) */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />

          {/* The 404 dimension */}
          <Route path="*" element={<ComingSoon />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
