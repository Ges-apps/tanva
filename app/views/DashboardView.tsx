'use client'

import { Plus, Flame } from 'lucide-react';
import { useStore } from '../../store';
import { todayKey, formatDateLabel } from '@/utils/format';
import { sumNutrition } from '@/utils/nutrition';
import { CircularProgress } from '@/components/CircularProgress';
import { MacroBar } from '@/components/MacroBar';
import { MealList } from '@/components/MealList';

export function DashboardView() {
  const goals = useStore((s) => s.goals);
  const days = useStore((s) => s.days);
  const setView = useStore((s) => s.setView);

  const key = todayKey();
  const day = days[key] ?? { date: key, foods: [] };
  const nutrition = sumNutrition(day.foods);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="text-center pt-2">
        <p className="text-sm text-gray-400 dark:text-gray-500">{formatDateLabel(key)}</p>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">امروز</h1>
      </div>

      {/* Circular progress */}
      <div className="glass rounded-3xl p-6 flex flex-col items-center">
        <CircularProgress consumed={nutrition.calories} goal={goals.calories} />
      </div>

      {/* Macro summary */}
      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Flame size={18} className="text-accent-500 dark:text-accent-400" />
          <h2 className="font-semibold text-gray-800 dark:text-gray-50">درشت‌مغذی‌ها</h2>
        </div>
        <div className="flex flex-col gap-3.5">
          <MacroBar label="پروتئین" value={nutrition.protein} goal={goals.protein} color="#3dcd8f" />
          <MacroBar label="کربوهیدرات" value={nutrition.carbs} goal={goals.carbs} color="#f59e0b" />
          <MacroBar label="چربی" value={nutrition.fat} goal={goals.fat} color="#ef4444" />
        </div>
      </div>

      {/* Meals */}
      <MealList foods={day.foods} dayKey={key} />

      {/* FAB */}
      <button
        onClick={() => setView('add')}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3.5 rounded-2xl shadow-lg shadow-accent-500/30 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <Plus size={20} strokeWidth={2.5} />
        افزودن غذا
      </button>
    </div>
  );
}
