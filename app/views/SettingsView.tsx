"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";
import { Check, Target } from "lucide-react";
import { useStore } from "../../store";
import type { Goals } from "@/types";

export function SettingsView() {
  const goals = useStore((s) => s.goals);
  const setGoals = useStore((s) => s.setGoals);
  const setView = useStore((s) => s.setView);

  const [form, setForm] = useState({
    calories: String(goals.calories),
    protein: String(goals.protein),
    carbs: String(goals.carbs),
    fat: String(goals.fat),
  });

  const [saved, setSaved] = useState(false);

  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  function update(field: keyof Goals, value: string) {
    // فقط اعداد را قبول کن؛ اجازه خالی شدن input را هم بده
    if (!/^\d*$/.test(value)) return;

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSave() {
    setGoals({
      calories: Number(form.calories) || 0,
      protein: Number(form.protein) || 0,
      carbs: Number(form.carbs) || 0,
      fat: Number(form.fat) || 0,
    });

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  const fields: {
    key: keyof Goals;
    label: string;
    hint: string;
  }[] = [
    {
      key: "calories",
      label: "هدف کالری روزانه",
      hint: "کالری",
    },
    {
      key: "protein",
      label: "هدف پروتئین",
      hint: "گرم",
    },
    {
      key: "carbs",
      label: "هدف کربوهیدرات",
      hint: "گرم",
    },
    {
      key: "fat",
      label: "هدف چربی",
      hint: "گرم",
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          تنظیمات
        </h1>

        <button
          type="button"
          onClick={() => setView("dashboard")}
          className="glass rounded-xl p-2.5 transition-all hover:scale-105 active:scale-95"
          aria-label="بازگشت به داشبورد"
        >
          <Target
            size={20}
            className="text-gray-600 dark:text-gray-300"
          />
        </button>
      </div>

      {/* Goals */}
      <div className="glass rounded-2xl p-5 space-y-5">
        <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
          {user?.given_name ? (
            <>
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {user.given_name}
              </span>{" "}
              عزیز،{" "}
            </>
          ) : null}
          اهداف روزانه خود را تنظیم کنید. این مقادیر در صفحه اصلی برای محاسبه
          پیشرفت استفاده می‌شوند.
        </p>

        {fields.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={`goal-${field.key}`}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block"
            >
              {field.label}
            </label>

            <div className="flex items-center gap-2">
              <input
                id={`goal-${field.key}`}
                type="number"
                inputMode="numeric"
                min="0"
                step="1"
                value={form[field.key]}
                onChange={(e) =>
                  update(field.key, e.target.value)
                }
                className="flex-1 bg-white/40 dark:bg-white/6 rounded-xl py-3 px-4 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-accent-400 tabular-nums text-lg font-medium"
              />

              <span className="text-sm text-gray-400 dark:text-gray-500 w-12 text-center">
                {field.hint}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Save */}
      <button
        type="button"
        onClick={handleSave}
        className="w-full flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium py-4 rounded-2xl shadow-lg shadow-accent-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-95"
      >
        <Check size={20} strokeWidth={2.5} />

        {saved ? "ذخیره شد!" : "ذخیره تنظیمات"}
      </button>
    </div>
  );
}