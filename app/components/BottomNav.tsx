'use client'
import { LayoutDashboard, Plus, History, Settings, Activity } from 'lucide-react';
import type { View } from '@/types';
import { useStore } from '../../store';

const NAV_ITEMS: { view: View; label: string; icon: typeof Plus }[] = [
  { view: 'dashboard', label: 'خانه', icon: LayoutDashboard },
  { view: 'add', label: 'افزودن', icon: Plus },
  { view : 'bmi' , label : 'شاخص توده بدنی' , icon:Activity},
  { view: 'history', label: 'تاریخچه', icon: History },
  { view: 'settings', label: 'تنظیمات', icon: Settings },
];

export function BottomNav() {
  const view = useStore((s) => s.view);
  const setView = useStore((s) => s.setView);

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-2xl px-4 pb-3">
        <div className="glass-strong rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/30 flex items-center justify-around p-1.5">
          {NAV_ITEMS.map((item) => {
            const active = view === item.view;
            const Icon = item.icon;
            return (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 flex-1"
              >
                <Icon
                  size={22}
                  className={`transition-colors duration-200 ${
                    active
                      ? 'text-accent-600 dark:text-accent-300'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span
                  className={`text-[11px] font-medium transition-colors duration-200 ${
                    active
                      ? 'text-accent-600 dark:text-accent-300'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
                {active && (
                  <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
