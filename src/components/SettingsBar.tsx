"use client";

import { useState } from "react";
import clsx from "clsx";

export default function SettingsBar() {
  const [mode, setMode] = useState("Time");
  const [time, setTime] = useState("30s");
  const [keyboard, setKeyboard] = useState("ON");

  return (
    <div className="flex justify-center my-8">
      <div className="bg-banana-dark text-banana-text rounded-full px-2 py-2 flex items-center gap-4 text-sm font-medium shadow-lg">
        {/* Mode Selection */}
        <div className="flex items-center gap-1 px-4">
          <span className="text-banana-text/60 mr-2">Mode</span>
          {["Time", "Words", "Quote", "Code"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={clsx(
                "px-3 py-1 rounded-full transition-colors",
                mode === m
                  ? "bg-banana-active text-banana-dark"
                  : "hover:text-banana-bg"
              )}
            >
              {m}
            </button>
          ))}
        </div>

        <span className="text-banana-text/30">|</span>

        {/* Time Selection */}
        <div className="flex items-center gap-1 px-4">
          <span className="text-banana-text/60 mr-2">Time</span>
          {["10s", "15s", "30s", "45s", "60s"].map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              className={clsx(
                "px-3 py-1 rounded-full transition-colors",
                time === t
                  ? "bg-banana-active text-banana-dark"
                  : "hover:text-banana-bg"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <span className="text-banana-text/30">|</span>

        {/* Keyboard Toggle */}
        <div className="flex items-center gap-1 px-4">
          <span className="text-banana-text/60 mr-2">Keyboard</span>
          <div className="bg-banana-active rounded-full p-1 flex">
             <button
              onClick={() => setKeyboard("ON")}
              className={clsx(
                "px-3 py-0.5 rounded-full text-xs transition-colors",
                keyboard === "ON"
                  ? "text-banana-dark font-bold"
                  : "text-banana-dark/50"
              )}
            >
              ON
            </button>
            <button
              onClick={() => setKeyboard("OFF")}
              className={clsx(
                "px-3 py-0.5 rounded-full text-xs transition-colors",
                keyboard === "OFF"
                  ? "text-banana-dark font-bold"
                  : "text-banana-dark/50"
              )}
            >
              OFF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
