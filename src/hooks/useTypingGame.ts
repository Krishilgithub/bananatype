import { useState, useEffect, useCallback, useRef } from "react";
import { generateText, Mode } from "@/utils/textGenerator";
import useSound from "@/hooks/useSound";

interface UseTypingGameProps {
  mode: Mode;
  timeConfig: string;
  soundEnabled: boolean;
  isPaused?: boolean;
}

export default function useTypingGame({ mode, timeConfig, soundEnabled, isPaused = false }: UseTypingGameProps) {
  // Game State
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  
  // Results State
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  
  // Hooks
  const { playClick, playError } = useSound(soundEnabled);
  
  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Initialize Game
  const initGame = useCallback(() => {
    const newText = generateText(mode, mode === "Words" ? 50 : 30);
    setText(newText);
    setUserInput("");
    setIsActive(false);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(0);
    setTimeTaken(0);
    startTimeRef.current = null;
    setIsFocused(false);
    
    // Parse time config
    const timeValue = parseInt(timeConfig.replace("s", ""));
    setTimeLeft(timeValue);
    
    if (timerRef.current) clearInterval(timerRef.current);
  }, [mode, timeConfig]);

  // Reset when settings change
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Calculate Results
  const calculateResults = useCallback(() => {
    const totalChars = userInput.length;
    const correctChars = userInput.split("").filter((char, i) => char === text[i]).length;
    
    // Calculate time taken
    let timeElapsed = 0;
    if (mode === "Time") {
      const timeValue = parseInt(timeConfig.replace("s", ""));
      timeElapsed = timeValue - timeLeft;
      // If time ran out, use full duration
      if (timeLeft === 0) timeElapsed = timeValue;
    } else {
      // For Words/Quote/Code, calculate from start time
      if (startTimeRef.current) {
        timeElapsed = (Date.now() - startTimeRef.current) / 1000;
      }
    }
    
    // Avoid division by zero
    if (timeElapsed <= 0) timeElapsed = 1;

    const calculatedWpm = (totalChars / 5) / (timeElapsed / 60);
    const calculatedAccuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 100;

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
    setTimeTaken(Math.round(timeElapsed));
  }, [userInput, text, mode, timeConfig, timeLeft]);

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

  // Trigger calculation when finished
  useEffect(() => {
    if (isFinished) {
      calculateResults();
      setIsFocused(false);
    }
  }, [isFinished, calculateResults]);

  // Key Handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Hotkey: Tab + Enter to restart
    if (e.key === "Enter" && activeKeys.includes("TAB")) {
      e.preventDefault();
      initGame();
      return;
    }

    if (isFinished || isPaused) return;

    // Ignore modifier keys alone
    if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab"].includes(e.key)) {
      if (e.key === "Tab") {
        e.preventDefault(); // Prevent focus loss
        setActiveKeys((prev) => {
            if (!prev.includes("TAB")) return [...prev, "TAB"];
            return prev;
        });
      }
      return;
    }

    const key = e.key.toUpperCase();
    setActiveKeys((prev) => {
      if (!prev.includes(key)) return [...prev, key];
      return prev;
    });

    // Start game on first keypress
    if (!isActive && !isFinished) {
      setIsActive(true);
      setIsFocused(true);
      startTimeRef.current = Date.now();
    }

    if (e.key === "Backspace") {
      playClick(); 
      setUserInput((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      const char = e.key;
      const expectedChar = text[userInput.length];
      
      if (char === expectedChar) {
        playClick();
      } else {
        playError();
      }

      setUserInput((prev) => {
        // Prevent typing beyond text length
        if (prev.length >= text.length) return prev;
        return prev + e.key;
      });
    }
  }, [isActive, isFinished, text, activeKeys, initGame, playClick, playError, userInput, isPaused]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key === "Tab" ? "TAB" : e.key.toUpperCase();
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

  // Blur Handler
  useEffect(() => {
    if (!isActive) {
      setIsFocused(false);
    }
  }, [isActive]);

  return {
    text,
    userInput,
    timeLeft,
    isActive,
    isFinished,
    activeKeys,
    isFocused,
    wpm,
    accuracy,
    timeTaken,
    initGame
  };
}
