"use client";

import { useState } from "react";
import { X, Volume2, VolumeX } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Settings");
  const [soundEnabled, setSoundEnabled] = useState(true);

  const links = ["Profile", "Settings", "Dashboard", "Leaderboard", "Multiplayer"];

  return (
    <nav className="flex items-center justify-between py-8 px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 text-banana-dark cursor-pointer select-none">
        <div className="w-8 h-8">
          {/* Simple Banana Icon Representation */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M4 2v20h2V2H4zm4 4v12h2V6H8zm4 4v4h2v-4h-2z" />
          </svg>
        </div>
        <span className="text-2xl font-bold tracking-tight">BananaType</span>
      </div>

      {/* Navigation Pill */}
      <div className="flex items-center gap-4">
        <div className="bg-banana-dark text-banana-text rounded-full px-6 py-2 flex items-center gap-6 text-sm font-medium">
          {links.map((link, index) => (
            <div key={link} className="flex items-center gap-6">
              <button
                onClick={() => setActiveLink(link)}
                className={clsx(
                  "transition-colors",
                  activeLink === link ? "text-banana-bg font-bold" : "hover:text-banana-bg"
                )}
              >
                {link}
              </button>
              {index < links.length - 1 && <span className="text-banana-text/30">|</span>}
            </div>
          ))}
        </div>

        {/* Actions */}
        <button className="w-10 h-10 rounded-full bg-banana-dark text-banana-text flex items-center justify-center hover:text-banana-bg transition-colors">
          <X size={20} />
        </button>
        <button 
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="w-10 h-10 rounded-full bg-banana-dark text-banana-text flex items-center justify-center hover:text-banana-bg transition-colors"
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>
    </nav>
  );
}
