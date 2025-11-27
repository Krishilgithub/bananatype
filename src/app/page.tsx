"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SettingsBar, { Theme } from "@/components/SettingsBar";
import TypingArea from "@/components/TypingArea";
import VirtualKeyboard from "@/components/VirtualKeyboard";
import ResultsModal from "@/components/ResultsModal";
import PlaceholderModal from "@/components/PlaceholderModal";
import ProfileModal from "@/components/ProfileModal";
import { Mode } from "@/utils/textGenerator";
import useTypingGame from "@/hooks/useTypingGame";
import clsx from "clsx";

export default function Home() {
  // Settings State
  const [mode, setMode] = useState<Mode>("Time");
  const [timeConfig, setTimeConfig] = useState("30s");
  const [keyboardEnabled, setKeyboardEnabled] = useState("ON");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState<Theme>("Banana");
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);
  
  // UI State
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Game Hook
  const {
    text,
    userInput,
    timeLeft,
    isFinished,
    activeKeys,
    isFocused,
    wpm,
    accuracy,
    timeTaken,
    initGame
  } = useTypingGame({
    mode,
    timeConfig,
    soundEnabled,
    isPaused: !!activeModal
  });

  // Load Settings from LocalStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("banana-mode") as Mode;
    const savedTime = localStorage.getItem("banana-time");
    const savedKeyboard = localStorage.getItem("banana-keyboard");
    const savedSound = localStorage.getItem("banana-sound");
    const savedTheme = localStorage.getItem("banana-theme") as Theme;

    if (savedMode) setMode(savedMode);
    if (savedTime) setTimeConfig(savedTime);
    if (savedKeyboard) setKeyboardEnabled(savedKeyboard);
    if (savedSound) setSoundEnabled(savedSound === "true");
    if (savedTheme) setTheme(savedTheme);
    
    setIsSettingsLoaded(true);
  }, []);

  // Save Settings to LocalStorage
  useEffect(() => {
    if (!isSettingsLoaded) return;
    localStorage.setItem("banana-mode", mode);
    localStorage.setItem("banana-time", timeConfig);
    localStorage.setItem("banana-keyboard", keyboardEnabled);
    localStorage.setItem("banana-sound", String(soundEnabled));
    localStorage.setItem("banana-theme", theme);
  }, [mode, timeConfig, keyboardEnabled, soundEnabled, theme, isSettingsLoaded]);

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Save History on Finish
  useEffect(() => {
    if (isFinished && wpm > 0) {
      const newResult = {
        wpm,
        accuracy,
        mode: mode === "Time" ? `${mode} ${timeConfig}` : mode,
        date: new Date().toISOString()
      };

      const savedHistory = localStorage.getItem("banana-history");
      const history = savedHistory ? JSON.parse(savedHistory) : [];
      const updatedHistory = [...history, newResult];
      
      localStorage.setItem("banana-history", JSON.stringify(updatedHistory));
    }
  }, [isFinished, wpm, accuracy, mode, timeConfig]);

  const handleNavigate = (page: string) => {
    if (page !== "Settings") {
      setActiveModal(page);
    }
  };

  if (!isSettingsLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <main className="h-screen overflow-hidden flex flex-col max-w-6xl mx-auto px-4 pb-12 relative transition-colors duration-300">
      <div className={clsx("transition-opacity duration-500", (isFocused || activeModal) ? "opacity-30 blur-sm" : "opacity-100")}>
        <Navbar 
          soundEnabled={soundEnabled} 
          setSoundEnabled={setSoundEnabled} 
          onNavigate={handleNavigate}
        />
        <SettingsBar 
          mode={mode} 
          setMode={setMode} 
          time={timeConfig} 
          setTime={setTimeConfig}
          keyboard={keyboardEnabled}
          setKeyboard={setKeyboardEnabled}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <TypingArea 
          text={text} 
          userInput={userInput} 
          timeLeft={timeLeft}
          onRestart={initGame}
          isFocused={isFocused && !activeModal}
        />
        
        {keyboardEnabled === "ON" && (
          <div className={clsx("transition-opacity duration-500 mt-8", (isFocused || activeModal) ? "opacity-40" : "opacity-100")}>
            <VirtualKeyboard activeKeys={activeKeys} />
          </div>
        )}
      </div>

      {isFinished && (
        <ResultsModal 
          wpm={wpm} 
          accuracy={accuracy} 
          timeTaken={timeTaken} 
          onRestart={initGame} 
        />
      )}

      {activeModal === "Profile" && (
        <ProfileModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal && activeModal !== "Profile" && (
        <PlaceholderModal 
          title={activeModal} 
          onClose={() => setActiveModal(null)} 
        />
      )}
    </main>
  );
}
