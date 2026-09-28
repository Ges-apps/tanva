'use client'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from 'react';
import { Check, Target } from 'lucide-react';
import { useStore } from '../../store';
import type { Goals } from '@/types';

export function SettingsView() {
  const goals = useStore((s) => s.goals);
  const setGoals = useStore((s) => s.setGoals);
  const setView = useStore((s) => s.setView);

  const [form, setForm] = useState<Goals>(goals);
  const [saved, setSaved] = useState(false);

  function update(field: keyof Goals, value: string) {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 0) return;
    setForm((f) => ({ ...f, [field]: num }));
  }

  function handleSave() {
    setGoals(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const {getUser} = useKindeBrowserClient();
  const user = getUser();
 
  const fields: { key: keyof Goals; label: string; hint: string }[] = [
    { key: 'calories', label: 'هدف کالری روزانه', hint: 'کالری' },
    { key: 'protein', label: 'هدف پروتئین', hint: 'گرم' },
    { key: 'carbs', label: 'هدف کربوهیدرات', hint: 'گرم' },
    { key: 'fat', label: 'هدف چربی', hint: 'گرم' },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">تنظیمات</h1>
        <button
          onClick={() => setView('dashboard')}
          className="glass rounded-xl p-2.5 transition-all hover:scale-105 active:scale-95"
        >
          <Target size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <div className="glass rounded-2xl p-5 space-y-5">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {user?.given_name}
          عزیز
          اهداف روزانه خود را تنظیم کنید. این مقادیر در صفحه اصلی برای محاسبه پیشرفت استفاده می‌شوند.
        </p>

        {fields.map((field) => (
          <div key={field.key}>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">
              {field.label}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={form[field.key]}
                onChange={(e) => update(field.key, e.target.value)}
                className="flex-1 bg-white/40 dark:bg-white/6 rounded-xl py-3 px-4 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-accent-400 tabular-nums text-lg font-medium"
                min="0"
              />
              <span className="text-sm text-gray-400 dark:text-gray-500 w-12 text-center">
                {field.hint}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="w-full flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium py-4 rounded-2xl shadow-lg shadow-accent-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-95"
      >
        <Check size={20} strokeWidth={2.5} />
        {saved ? 'ذخیره شد!' : 'ذخیره تنظیمات'}
      </button>
    </div>
  );
}
