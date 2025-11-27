"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import SettingsBar from "@/components/SettingsBar";
import TypingArea from "@/components/TypingArea";
import VirtualKeyboard from "@/components/VirtualKeyboard";

const SAMPLE_TEXT = "As the sun dipped behind the quiet horizon, I reminded myself that progress is built through small, consistent steps, and even on days when motivation fades, showing up with discipline shapes the confidence and skill needed to chase bigger goals.";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Key Handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isFinished) return;

    // Prevent default for some keys to avoid browser shortcuts if needed
    // e.preventDefault(); // Be careful with this

    const key = e.key.toUpperCase();
    setActiveKeys((prev) => [...prev, key]);

    if (!isActive && /^[a-zA-Z0-9,.'";:?<>\[\]{}\\/!@#$%^&*()_+\-= ]$/.test(e.key)) {
      setIsActive(true);
    }

    if (e.key === "Backspace") {
      setUserInput((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      setUserInput((prev) => {
        if (prev.length >= SAMPLE_TEXT.length) return prev;
        return prev + e.key;
      });
    }
  }, [isActive, isFinished]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toUpperCase();
    setActiveKeys((prev) => prev.filter((k) => k !== key));
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handleRestart = () => {
    setUserInput("");
    setTimeLeft(30);
    setIsActive(false);
    setIsFinished(false);
  };

  return (
    <main className="h-screen overflow-hidden flex flex-col max-w-6xl mx-auto px-4 pb-12">
      <Navbar />
      <SettingsBar />
      
      <div className="flex-1 flex flex-col justify-center">
        <TypingArea 
          text={SAMPLE_TEXT} 
          userInput={userInput} 
          timeLeft={timeLeft}
          onRestart={handleRestart}
        />
        
        <VirtualKeyboard activeKeys={activeKeys} />
      </div>
    </main>
  );
}
