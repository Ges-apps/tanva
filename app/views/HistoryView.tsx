'use client'



import { useMemo } from 'react';
import { useStore } from '../../store';
import { todayKey, dateKey, formatDateLabel } from '@/utils/format';
import { sumNutrition } from '@/utils/nutrition';

export function HistoryView() {
  const days = useStore((s) => s.days);
  const goals = useStore((s) => s.goals);

  const history = useMemo(() => {
    const today = todayKey();
    const entries: { key: string; calories: number; goal: number }[] = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = dateKey(d);
      const day = days[key];
      const cals = day ? sumNutrition(day.foods).calories : 0;
      entries.push({ key, calories: cals, goal: goals.calories });
    }
    return entries.reverse();
  }, [days, goals.calories]);

  const maxCals = Math.max(goals.calories, ...history.map((h) => h.calories), 1);
  const chartHeight = 160;

  return (
    <div className="space-y-5 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">تاریخچه</h1>

      {/* Chart */}
      <div className="glass rounded-2xl p-5">
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
          کالری ۱۴ روز گذشته
        </h2>
        <div className="flex items-end justify-between gap-1" style={{ height: chartHeight }}>
          {history.map((entry, i) => {
            const h = Math.max(4, (entry.calories / maxCals) * chartHeight);
            const isToday = entry.key === todayKey();
            const over = entry.calories > entry.goal && entry.calories > 0;
            const goalH = (entry.goal / maxCals) * chartHeight;

            return (
              <div key={entry.key} className="flex-1 flex flex-col items-center justify-end relative" style={{ height: chartHeight }}>
                {/* Goal line */}
                <div
                  className="absolute inset-x-0 border-t border-dashed border-gray-300/50 dark:border-gray-500/30"
                  style={{ bottom: goalH }}
                />
                <div
                  className="w-full rounded-t-md transition-all duration-500 ease-out"
                  style={{
                    height: h,
                    backgroundColor: isToday
                      ? '#16b074'
                      : over
                        ? '#ef444480'
                        : '#3dcd8f60',
                  }}
                  title={`${formatDateLabel(entry.key)}: ${Math.round(entry.calories)} کالری`}
                />
                {isToday && (
                  <span className="text-[9px] text-accent-600 dark:text-accent-400 font-bold mt-1">امروز</span>
                )}
                {i === history.length - 1 && !isToday && (
                  <span className="text-[9px] text-gray-400 mt-1">
                    {history.length - 1 - i} روز
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-accent-500" />
            <span>امروز</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-accent-400/60" />
            <span>روزهای قبل</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0 border-t border-dashed border-gray-400" />
            <span>هدف</span>
          </div>
        </div>
      </div>

      {/* Day list */}
      <div className="space-y-2">
        {[...history].reverse().map((entry) => {
          const day = days[entry.key];
          const foodCount = day?.foods.length ?? 0;
          const percentage = entry.goal > 0 ? Math.round((entry.calories / entry.goal) * 100) : 0;

          return (
            <div key={entry.key} className="glass rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-100 text-sm">
                  {formatDateLabel(entry.key)}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {foodCount.toLocaleString('fa-IR')} غذا · {percentage.toLocaleString('fa-IR')}٪ از هدف
                </p>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800 dark:text-white tabular-nums">
                  {Math.round(entry.calories).toLocaleString('fa-IR')}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">کالری</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
