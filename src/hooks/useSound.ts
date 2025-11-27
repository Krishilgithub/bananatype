import { useCallback, useRef, useEffect } from "react";

export default function useSound(enabled: boolean) {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on user interaction if needed, but here we just set it up
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioContextRef.current = new AudioContextClass();
    }
  }, []);

  const playClick = useCallback(() => {
    if (!enabled || !audioContextRef.current) return;
    
    // Resume context if suspended (browser policy)
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Create a short, high-pitched "click"
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }, [enabled]);

  const playError = useCallback(() => {
    if (!enabled || !audioContextRef.current) return;

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Lower pitched "thud" or "beep" for error
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }, [enabled]);

  return { playClick, playError };
}
