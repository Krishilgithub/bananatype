"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "@/components/Navbar";
import SettingsBar from "@/components/SettingsBar";
import TypingArea from "@/components/TypingArea";
import VirtualKeyboard from "@/components/VirtualKeyboard";
import { generateText, Mode } from "@/utils/textGenerator";

export default function Home() {
  // Settings State
  const [mode, setMode] = useState<Mode>("Time");
  const [timeConfig, setTimeConfig] = useState("30s");
  const [keyboardEnabled, setKeyboardEnabled] = useState("ON");

  // Game State
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  
  // Refs for timers and intervals
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Game
  const initGame = useCallback(() => {
    const newText = generateText(mode, mode === "Words" ? 50 : 30);
    setText(newText);
    setUserInput("");
    setIsActive(false);
    setIsFinished(false);
    
    // Parse time config
    const timeValue = parseInt(timeConfig.replace("s", ""));
    setTimeLeft(timeValue);
    
    if (timerRef.current) clearInterval(timerRef.current);
  }, [mode, timeConfig]);

  // Reset when settings change
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Timer Logic
  useEffect(() => {
    if (isActive && timeLeft > 0 && mode === "Time") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsFinished(true);
            setIsActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, mode]);

  // Check for completion (Words/Quote/Code mode)
  useEffect(() => {
    if (mode !== "Time" && userInput.length === text.length && text.length > 0) {
      setIsFinished(true);
      setIsActive(false);
    }
  }, [userInput, text, mode]);

  // Key Handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isFinished) return;

    // Ignore modifier keys alone
    if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab"].includes(e.key)) return;

    const key = e.key.toUpperCase();
    setActiveKeys((prev) => {
      if (!prev.includes(key)) return [...prev, key];
      return prev;
    });

    // Start game on first keypress
    if (!isActive && !isFinished) {
      setIsActive(true);
    }

    if (e.key === "Backspace") {
      setUserInput((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      setUserInput((prev) => {
        // Prevent typing beyond text length
        if (prev.length >= text.length) return prev;
        return prev + e.key;
      });
    }
  }, [isActive, isFinished, text]);

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

  return (
    <main className="h-screen overflow-hidden flex flex-col max-w-6xl mx-auto px-4 pb-12">
      <Navbar />
      <SettingsBar 
        mode={mode} 
        setMode={setMode} 
        time={timeConfig} 
        setTime={setTimeConfig}
        keyboard={keyboardEnabled}
        setKeyboard={setKeyboardEnabled}
      />
      
      <div className="flex-1 flex flex-col justify-center">
        <TypingArea 
          text={text} 
          userInput={userInput} 
          timeLeft={timeLeft}
          onRestart={initGame}
        />
        
        {keyboardEnabled === "ON" && (
          <VirtualKeyboard activeKeys={activeKeys} />
        )}
      </div>
    </main>
  );
}
