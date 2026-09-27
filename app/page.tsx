'use client'

import { useEffect } from 'react';
import { Flame } from 'lucide-react';
import { useStore } from '../store';
import { BottomNav } from '@/components/BottomNav';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DashboardView } from '@/views/DashboardView';
import { AddFoodView } from '@/views/AddFoodView';
import { HistoryView } from '@/views/HistoryView';
import { SettingsView } from '@/views/SettingsView';



function App() {
  const theme = useStore((s) => s.theme);
  const view = useStore((s) => s.view);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-emerald-50/40 dark:from-[#0b0f17] dark:via-[#0f1520] dark:to-[#0a1a14] transition-colors duration-300">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-300/25 dark:bg-accent-500/12 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-300/15 dark:bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 bg-emerald-200/10 dark:bg-emerald-500/6 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 pt-6 pb-32 min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
           
            <div>
              <img src='/tanva-logo.png' alt="Tanva Logo" className="w-32 h-10" />
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Content */}
        {view === 'dashboard' && <DashboardView />}
        {view === 'add' && <AddFoodView />}
        {view === 'history' && <HistoryView />}
        {view === 'settings' && <SettingsView />}
      </div>

      <BottomNav />
    </div>
  );
}

export default App;