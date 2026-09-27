'use client'


import { Moon, Sun } from 'lucide-react';
import { useStore } from '../../store';

export function ThemeToggle() {
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className="glass rounded-xl p-2.5 transition-all duration-200 hover:scale-100 active:scale-95"
      aria-label="تغییر تم"
    >
      {theme === 'light' ? (
        <Moon size={16} className="text-gray-600" />
      ) : (
        <Sun size={16} className="text-amber-400" />
      )}
    </button>
  );
}
