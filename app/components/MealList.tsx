'use client'

import { Trash2 } from 'lucide-react';
import type { LoggedFood, MealType } from '@/types';
import { MEAL_LABELS, MEAL_ORDER } from '@/data/foods';
import { useStore } from '../../store';
import { isToday } from '@/utils/format';

interface MealListProps {
  foods: LoggedFood[];
  dayKey: string;
}

export function MealList({ foods, dayKey }: MealListProps) {
  const removeFood = useStore((s) => s.removeFood);
  const canRemove = isToday(dayKey);

  const grouped = MEAL_ORDER.reduce(
    (acc, meal) => {
      acc[meal] = foods.filter((f) => f.meal === meal);
      return acc;
    },
    {} as Record<MealType, LoggedFood[]>,
  );

  return (
    <div className="space-y-3">
      {MEAL_ORDER.map((meal) => {
        const items = grouped[meal];
        const mealCals = items.reduce((sum, f) => sum + f.calories, 0);

        return (
          <div key={meal} className="glass rounded-2xl p-4 animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 dark:text-gray-50">
                {MEAL_LABELS[meal]}
              </h3>
              <span className="text-sm text-gray-400 dark:text-gray-400 tabular-nums">
                {Math.round(mealCals).toLocaleString('fa-IR')} کالری
              </span>
            </div>

            {items.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-600 py-2 text-center">
                موردی ثبت نشده
              </p>
            ) : (
              <div className="space-y-2">
                {items.map((food) => (
                  <div
                    key={food.id}
                    className="flex items-center justify-between bg-white/40 dark:bg-white/[0.06] rounded-xl px-3 py-2.5"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-100 truncate">
                        {food.foodName}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 tabular-nums mt-0.5">
                        {food.quantity.toLocaleString('fa-IR')} واحد · {Math.round(food.calories).toLocaleString('fa-IR')} کالری
                      </p>
                    </div>
                    <div className="flex items-center gap-3 ml-2">
                      <div className="flex gap-2 text-[11px] text-gray-400 dark:text-gray-400 tabular-nums">
                        <span>پ{Math.round(food.protein).toLocaleString('fa-IR')}</span>
                        <span>ک{Math.round(food.carbs).toLocaleString('fa-IR')}</span>
                        <span>چ{Math.round(food.fat).toLocaleString('fa-IR')}</span>
                      </div>
                      {canRemove && (
                        <button
                          onClick={() => removeFood(dayKey, food.id)}
                          className="text-gray-300 hover:text-red-500 dark:text-gray-600 transition-colors"
                          aria-label="حذف"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
