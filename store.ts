import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DayLog, Goals, LoggedFood, Theme, View } from '@/types';
import { todayKey } from '@/utils/format';

interface AppState {
  theme: Theme;
  goals: Goals;
  days: Record<string, DayLog>;
  view: View;

  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setGoals: (g: Goals) => void;
  setView: (v: View) => void;

  addFood: (food: LoggedFood) => void;
  removeFood: (dayKey: string, foodId: string) => void;
  getDay: (dayKey: string) => DayLog;
}

const DEFAULT_GOALS: Goals = {
  calories: 2000,
  protein: 120,
  carbs: 220,
  fat: 65,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      goals: DEFAULT_GOALS,
      days: {},
      view: 'dashboard',

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      setGoals: (goals) => set({ goals }),
      setView: (view) => set({ view }),

      addFood: (food) => {
        const key = todayKey();
        const days = { ...get().days };
        const day = days[key] ?? { date: key, foods: [] };
        days[key] = { ...day, foods: [...day.foods, food] };
        set({ days });
      },

      removeFood: (dayKey, foodId) => {
        const days = { ...get().days };
        const day = days[dayKey];
        if (!day) return;
        days[dayKey] = { ...day, foods: day.foods.filter((f) => f.id !== foodId) };
        set({ days });
      },

      getDay: (dayKey) => {
        return get().days[dayKey] ?? { date: dayKey, foods: [] };
      },
    }),
    {
      name: 'calorie-counter',
      partialize: (s) => ({ theme: s.theme, goals: s.goals, days: s.days }),
    },
  ),
);
