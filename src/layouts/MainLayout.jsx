// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <div className="bg-[radial-gradient(circle_at_top_center,_#ee3f3622_10%,_transparent_60%)] dark:bg-[radial-gradient(circle_at_top_center,_#ee3f363c_10%,_transparent_60%)]">
      <div className={`flex h-screen`}>
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
