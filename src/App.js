import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import StudentsPage from "./pages/Students";
import LatihanPage from "./pages/Latihan";
import EvaluasiPage from "./pages/Evaluasi";
import LeaderboardPage from "./pages/Leaderboard";
import MainLayout from "./layout/MainLayout";

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/latihan" element={<LatihanPage />} />
          <Route path="/evaluasi" element={<EvaluasiPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
  }
