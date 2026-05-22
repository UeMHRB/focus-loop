"use client";

interface SettingsProps {
    focusDuration: number;
    breakDuration: number;
    onFocusChange: (value: number) => void;
    onBreakChange: (value: number) => void;
}

export default function Settings({ focusDuration, breakDuration, onFocusChange, onBreakChange }: SettingsProps) {
    return (
  <div className="w-full max-w-md bg-(--background)round)] border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
    <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 opacity-50">Settings</h3>
    <div className="flex gap-4">
      <div className="flex-1 flex flex-col gap-1">
        <label className="text-xs opacity-60">Focus (min)</label>
        <input
          type="number"
          min={1}
          max={60}
          value={focusDuration}
          onChange={(e) => onFocusChange(Number(e.target.value))}
          className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <label className="text-xs opacity-60">Break (min)</label>
        <input
          type="number"
          min={1}
          max={30}
          value={breakDuration}
          onChange={(e) => onBreakChange(Number(e.target.value))}
          className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-center font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  </div>
);
}