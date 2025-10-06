// src/components/layout/ResponsiveDrawer.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function ResponsiveDrawer({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar untuk desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Drawer mobile */}
      <div className="md:hidden">
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-500 text-white shadow-md"
          onClick={() => setOpen(!open)}
        >
          <Menu size={22} />
        </button>

        {/* Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Drawer content */}
        <div
          className={`fixed top-0 left-0 z-50 h-full w-64 bg-blue-500 text-white transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onNavigate={() => setOpen(false)} />
        </div>
      </div>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
                     }
