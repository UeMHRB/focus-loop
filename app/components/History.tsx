"use client";

interface Session{
    duration: number;
    completedAt: string;
    date: string;
}

interface HistoryProps{
    sessions: Session[];
}

export default function History({ sessions }: HistoryProps) {
    return (
  <div className="w-full max-w-md border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
    <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 opacity-50">
      Today's Sessions
    </h3>
    {sessions.length === 0 ? (
      <p className="text-sm opacity-40 text-center py-4">
        No sessions yet. Start focusing!
      </p>
    ) : (
      <ul className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {sessions.map((session, index) => (
          <li
            key={index}
            className="flex items-center justify-between text-sm px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300"
          >
            <span>✓ {Math.floor(session.duration / 60)}:00 focus</span>
            <span className="opacity-60">{session.completedAt}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}
