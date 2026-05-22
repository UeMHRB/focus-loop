"use client";

import { useState, useEffect } from "react";

interface TimerProps {
    focusDuration: number;
    breakDuration: number;
    onSessionComplete: () => void;
}

export default function Timer ({ focusDuration, breakDuration, onSessionComplete }: TimerProps) {
    const [timeLeft, setTimeLeft]= useState(focusDuration * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode]=useState<"focus" | "break">("focus");

    useEffect ( () => {
        if (!isRunning) return;

        const interval = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        setIsRunning(false);
        playBeep();
        if (mode === "focus") {
          setTimeout(() => onSessionComplete(), 0);
          setMode("break");
          return breakDuration * 60;
        } else {
          setMode("focus");
          return focusDuration * 60;
        }
      }
      return prev - 1;
    });
  }, 1000);
    return () => clearInterval(interval);
    }, [isRunning]);

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(mode === "focus" ? focusDuration * 60 : breakDuration * 60);
    }

    const playBeep = () => {
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1.5);
    }

    return (
  <div className="flex flex-col items-center gap-6 w-full max-w-md">
    
    <div className={`w-full text-center py-3 rounded-full text-sm font-semibold tracking-widest uppercase ${
      mode === "focus"
        ? "bg-red-500 text-white"
        : "bg-green-500 text-white"
    }`}>
      {mode === "focus" ? "Focus Time" : "Break Time"}
    </div>

    <p className="text-8xl font-mono font-bold tracking-tight">
      {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
      {String(timeLeft % 60).padStart(2, "0")}
    </p>

    <div className="flex gap-4">
      <button
        onClick={() => setIsRunning(!isRunning)}
        className={`px-8 py-3 rounded-full font-semibold text-white transition-all ${
          mode === "focus"
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isRunning ? "Pause" : isRunning === false && timeLeft < (mode === "focus" ? focusDuration * 60 : breakDuration * 60) ? "Resume" : "Start"}
      </button>
      <button
        onClick={handleReset}
        className="px-8 py-3 rounded-full font-semibold border border-current hover:opacity-70 transition-all"
      >
        Reset
      </button>
    </div>

  </div>
);
}