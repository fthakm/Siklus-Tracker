import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import ResponsiveDrawer from "./components/layout/ResponsiveDrawer";

import DashboardPage from "./pages/DashboardPage";
import SiswaPage from "./pages/SiswaPage";
import LatihanPage from "./pages/LatihanPage";
import EvaluasiPage from "./pages/EvaluasiPage";
import LeaderboardPage from "./pages/LeaderboardPage";

import "./App.css";

export default function App() {
  return (
    <div className="app-container flex min-h-screen bg-gray-50 text-gray-900 font-inter">
      {/* Sidebar responsif (drawer di mobile) */}
      <ResponsiveDrawer>
        <Sidebar />
      </ResponsiveDrawer>

      {/* Konten utama */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/siswa" element={<SiswaPage />} />
            <Route path="/latihan" element={<LatihanPage />} />
            <Route path="/evaluasi" element={<EvaluasiPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
  }
