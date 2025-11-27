import { X, Volume2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-8 px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 text-banana-dark">
        <div className="w-8 h-8">
          {/* Simple Banana Icon Representation */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M4 2v20h2V2H4zm4 4v12h2V6H8zm4 4v4h2v-4h-2z" />
            {/* This is a placeholder icon, replacing with a better one or text if needed */}
          </svg>
        </div>
        <span className="text-2xl font-bold tracking-tight">BananaType</span>
      </div>

      {/* Navigation Pill */}
      <div className="flex items-center gap-4">
        <div className="bg-banana-dark text-banana-text rounded-full px-6 py-2 flex items-center gap-6 text-sm font-medium">
          <a href="#" className="hover:text-banana-bg transition-colors">Profile</a>
          <span className="text-banana-text/30">|</span>
          <a href="#" className="hover:text-banana-bg transition-colors">Settings</a>
          <span className="text-banana-text/30">|</span>
          <a href="#" className="hover:text-banana-bg transition-colors">Dashboard</a>
          <span className="text-banana-text/30">|</span>
          <a href="#" className="hover:text-banana-bg transition-colors">Leaderboard</a>
          <span className="text-banana-text/30">|</span>
          <a href="#" className="hover:text-banana-bg transition-colors">Multiplayer</a>
        </div>

        {/* Actions */}
        <button className="w-10 h-10 rounded-full bg-banana-dark text-banana-text flex items-center justify-center hover:text-banana-bg transition-colors">
          <X size={20} />
        </button>
        <button className="w-10 h-10 rounded-full bg-banana-dark text-banana-text flex items-center justify-center hover:text-banana-bg transition-colors">
          <Volume2 size={20} />
        </button>
      </div>
    </nav>
  );
}
