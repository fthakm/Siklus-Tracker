// src/components/layout/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  ClipboardCheck,
  Award,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
  { name: "Siswa", path: "/siswa", icon: <Users size={20} /> },
  { name: "Latihan", path: "/latihan", icon: <Dumbbell size={20} /> },
  { name: "Evaluasi", path: "/evaluasi", icon: <ClipboardCheck size={20} /> },
  { name: "Leaderboard", path: "/leaderboard", icon: <Award size={20} /> },
];

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="h-full w-64 bg-blue-500 text-white flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-blue-400">
        <img
          src="/assets/logo.svg"
          alt="Logo"
          className="w-8 h-8 mr-2"
        />
        <span className="text-lg font-semibold tracking-wide">
          Siklus Tracker
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-inner"
                  : "hover:bg-blue-600 hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 text-xs text-center text-blue-100 border-t border-blue-400">
        © {new Date().getFullYear()} FitKids
      </div>
    </aside>
  );
    }
