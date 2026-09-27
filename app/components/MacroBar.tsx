

interface MacroBarProps {
  label: string;
  value: number;
  goal: number;
  color: string;
  unit?: string;
}

export function MacroBar({ label, value, goal, color, unit = 'g' }: MacroBarProps) {
  const percentage = goal > 0 ? Math.min(100, (value / goal) * 100) : 0;

  return (
    <div className="flex-1">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-200">{label}</span>
        <span className="text-xs text-gray-400 dark:text-gray-400 tabular-nums">
          {Math.round(value).toLocaleString('fa-IR')} / {goal.toLocaleString('fa-IR')} {unit}
        </span>
      </div>
      <div className="h-2 rounded-full bg-gray-200/70 dark:bg-slate-700/50 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
