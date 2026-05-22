"use client";

import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import History from "./components/History";
import Settings from "./components/Settings";

interface Session{
  duration: number;
  completedAt: string;
  date: string;
}

export default function Home() {
    const [focusDuration, setFocusDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      const today = new Date().toLocaleDateString();
      const stored = localStorage.getItem("focusloop-sessions");
      if (stored) {
        const parsed: Session[] = JSON.parse(stored);
        const todaySessions = parsed.filter(s => s.date === today);
        setSessions(todaySessions);
      }
    }, []);

    const handleSessionComplete = () => {
      const today = new Date().toLocaleDateString();
      const newSession: Session = {
        duration: focusDuration * 60,
        completedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        date: today,
      };
      const updated = [...sessions, newSession];
      setSessions(updated);
      localStorage.setItem("focusloop-sessions", JSON.stringify(updated));
    };

    return (
  <div className={isDark ? "dark min-h-screen" : "min-h-screen"} >
    <main className="min-h-screen flex flex-col items-center justify-center p-10 gap-8 bg-(--background) text-(--foreground) px-4">
      <div className="flex items-center justify-between w-full max-w-md">
        <h1 className="text-4xl font-bold">FocusLoop</h1>
        <button
          onClick={() => setIsDark(!isDark)}
          className="px-4 py-2 rounded-full border border-current text-sm"
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <Settings
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        onFocusChange={(value) => setFocusDuration(value)}
        onBreakChange={(value) => setBreakDuration(value)}
      />
      <Timer
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        onSessionComplete={handleSessionComplete}
      />
      <History sessions={sessions} />
    </main>
  </div>
);
}