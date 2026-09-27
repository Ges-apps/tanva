'use client'



interface CircularProgressProps {
  consumed: number;
  goal: number;
  size?: number;
}

export function CircularProgress({ consumed, goal, size = 220 }: CircularProgressProps) {
  const remaining = Math.max(0, goal - consumed);
  const percentage = goal > 0 ? Math.min(1, consumed / goal) : 0;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percentage);

  const isOver = consumed > goal;
  const stroke = isOver ? '#ef4444' : '#16b074';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-gray-200/70 dark:stroke-slate-700/60"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-gray-800 dark:text-white tabular-nums">
          {Math.round(remaining).toLocaleString('fa-IR')}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-300 mt-1">کالری باقی‌مانده</span>
        <span className="text-xs text-gray-400 dark:text-gray-400 mt-2">
          {Math.round(consumed).toLocaleString('fa-IR')} / {goal.toLocaleString('fa-IR')}
        </span>
      </div>
    </div>
  );
}
