import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Dumbbell,
  BarChart2,
  Award,
  Menu,
  X,
} from "lucide-react";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
    { name: "Siswa", icon: <Users size={18} />, path: "/students" },
    { name: "Latihan", icon: <Dumbbell size={18} />, path: "/latihan" },
    { name: "Evaluasi", icon: <BarChart2 size={18} />, path: "/evaluasi" },
    { name: "Leaderboard", icon: <Award size={18} />, path: "/leaderboard" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h1 className="text-lg font-bold text-blue-600">Siklus Tracker</h1>
          <button
            className="md:hidden text-gray-500"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col mt-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center px-5 py-2.5 rounded-lg mx-3 text-sm font-medium transition
                ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <h2 className="font-semibold text-lg text-gray-800">
              {navItems.find((i) => i.path === location.pathname)?.name ||
                "Siklus Tracker"}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>🏋️‍♂️ Versi 1.0</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
            }
