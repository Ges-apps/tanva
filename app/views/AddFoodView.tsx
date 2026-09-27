'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../../store';
import { FOODS, MEAL_LABELS, MEAL_ORDER } from '@/data/foods';
import { computeNutrition, createLoggedFood } from '@/utils/nutrition';
import type { FoodItem, MealType } from '@/types';

export function AddFoodView() {
  const addFood = useStore((s) => s.addFood);
  const setView = useStore((s) => s.setView);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [meal, setMeal] = useState<MealType>('breakfast');

  // مقدار پیش‌فرض
  const [quantity, setQuantity] = useState('1');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return FOODS;

    return FOODS.filter(
      (f) =>
        f.name.includes(query.trim()) ||
        f.nameEn.toLowerCase().includes(q),
    );
  }, [query]);

  const qtyNum = parseFloat(quantity) || 0;

  const nutrition = selected
    ? computeNutrition(selected, qtyNum)
    : null;

  /**
   * انتخاب غذا
   *
   * مقدار اولیه بر اساس servingSize خود غذا تنظیم می‌شود.
   *
   * مثال:
   * موز     -> 1 عدد
   * سیب     -> 1 عدد
   * پرتقال  -> 1 عدد
   * خربزه   -> 100 گرم
   * هندوانه -> 100 گرم
   */
  function handleSelectFood(food: FoodItem) {
    setSelected(food);

    const defaultQuantity = food.servingSize ?? 1;

    setQuantity(String(defaultQuantity));
  }

  function handleAdd() {
    if (!selected || qtyNum <= 0) return;

    addFood(createLoggedFood(selected, qtyNum, meal));

    setView('dashboard');
  }

  function reset() {
    setSelected(null);
    setQuery('');
    setQuantity('1');
  }

  /**
   * واحد قابل نمایش
   *
   * اولویت با servingUnit است.
   * اگر وجود نداشت، از unit استفاده می‌کنیم.
   */
  function getDisplayUnit(food: FoodItem) {
    return food.servingUnit || food.unit;
  }

  if (selected) {
    const displayUnit = getDisplayUnit(selected);

    return (
      <div className="space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={reset}
            className="glass rounded-xl p-2.5 transition-all hover:scale-105 active:scale-95"
          >
            <ArrowRight
              size={20}
              className="text-gray-600 dark:text-gray-300"
            />
          </button>

          <h1 className="text-lg font-bold text-gray-800 dark:text-white">
            تأیید غذا
          </h1>

          <div className="w-10" />
        </div>

        {/* Food info */}
        <div className="glass rounded-2xl p-5">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {selected.name}
          </h2>

          <p className="text-sm text-gray-400 dark:text-gray-400 mt-1">
            {selected.nameEn} · واحد: {displayUnit}
          </p>
        </div>

        {/* Meal */}
        <div className="glass rounded-2xl p-4">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3 block">
            وعده غذایی
          </label>

          <div className="grid grid-cols-2 gap-2">
            {MEAL_ORDER.map((m) => (
              <button
                key={m}
                onClick={() => setMeal(m)}
                className={`py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  meal === m
                    ? 'bg-accent-500 text-white shadow-md shadow-accent-500/20'
                    : 'bg-white/40 dark:bg-white/[0.06] text-gray-600 dark:text-gray-300'
                }`}
              >
                {MEAL_LABELS[m]}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="glass rounded-2xl p-4">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3 block">
            مقدار
          </label>

          <div className="flex items-center gap-3">
            {/* Minus */}
            <button
              onClick={() => {
                const step = selected.unit === 'عدد' ? 1 : 10;

                const minValue =
                  selected.unit === 'عدد' ? 1 : 1;

                setQuantity(
                  String(
                    Math.max(
                      minValue,
                      qtyNum - step,
                    ),
                  ),
                );
              }}
              className="glass rounded-xl w-11 h-11 flex items-center justify-center text-lg font-bold text-gray-600 dark:text-gray-300 transition-all hover:scale-105 active:scale-95"
            >
              −
            </button>

            {/* Quantity input */}
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="flex-1 text-center text-xl font-bold bg-white/40 dark:bg-white/[0.06] rounded-xl py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-accent-400 tabular-nums"
              min="0"
              step={selected.unit === 'عدد' ? '1' : '10'}
            />

            {/* Plus */}
            <button
              onClick={() => {
                const step = selected.unit === 'عدد' ? 1 : 10;

                setQuantity(
                  String(qtyNum + step),
                );
              }}
              className="glass rounded-xl w-11 h-11 flex items-center justify-center text-lg font-bold text-gray-600 dark:text-gray-300 transition-all hover:scale-105 active:scale-95"
            >
              +
            </button>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
            واحد: {displayUnit}
          </p>
        </div>

        {/* Nutrition */}
        {nutrition && (
          <div className="glass rounded-2xl p-5">
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
              ارزش غذایی محاسبه‌شده
            </p>

            <div className="grid grid-cols-4 gap-2 text-center">
              {/* Calories */}
              <div>
                <p className="text-2xl font-bold text-accent-600 dark:text-accent-400 tabular-nums">
                  {Math.round(nutrition.calories).toLocaleString('fa-IR')}
                </p>

                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  کالری
                </p>
              </div>

              {/* Protein */}
              <div>
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-100 tabular-nums">
                  {Math.round(nutrition.protein).toLocaleString('fa-IR')}
                </p>

                <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">
                  پروتئین
                </p>
              </div>

              {/* Carbs */}
              <div>
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-100 tabular-nums">
                  {Math.round(nutrition.carbs).toLocaleString('fa-IR')}
                </p>

                <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">
                  کربوهیدرات
                </p>
              </div>

              {/* Fat */}
              <div>
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-100 tabular-nums">
                  {Math.round(nutrition.fat).toLocaleString('fa-IR')}
                </p>

                <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">
                  چربی
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Add */}
        <button
          onClick={handleAdd}
          disabled={qtyNum <= 0}
          className="w-full flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-4 rounded-2xl shadow-lg shadow-accent-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-95"
        >
          <Plus size={20} strokeWidth={2.5} />

          افزودن به {MEAL_LABELS[meal]}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          افزودن غذا
        </h1>

        <button
          onClick={() => setView('dashboard')}
          className="glass rounded-xl p-2.5 transition-all hover:scale-105 active:scale-95"
        >
          <ArrowRight
            size={20}
            className="text-gray-600 rotate-180 dark:text-gray-300"
          />
        </button>
      </div>

      {/* Search */}
      <div className="glass rounded-2xl p-2 flex items-center gap-2">
        <Search
          size={20}
          className="text-gray-400 dark:text-gray-400 mr-2"
        />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی غذا..."
          className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 py-2"
        />
      </div>

      {/* Results */}
      <div className="space-y-2">
        {results.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 py-12">
            غذایی پیدا نشد
          </p>
        ) : (
          results.map((food) => {
            const displayUnit = getDisplayUnit(food);

            return (
              <button
                key={food.id}
                onClick={() => handleSelectFood(food)}
                className="w-full glass rounded-2xl p-4 flex items-center justify-between text-right transition-all duration-200 hover:scale-[1.02] active:scale-95 animate-slide-up"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-50">
                    {food.name}
                  </p>

                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {Math.round(food.calories).toLocaleString('fa-IR')}{' '}
                    کالری در {food.servingSize?.toLocaleString('fa-IR') ?? '۱'}{' '}
                    {displayUnit}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-2 text-[11px] text-gray-400 dark:text-gray-500 tabular-nums">
                    <span>
                      پ{Math.round(food.protein).toLocaleString('fa-IR')}
                    </span>

                    <span>
                      ک{Math.round(food.carbs).toLocaleString('fa-IR')}
                    </span>

                    <span>
                      چ{Math.round(food.fat).toLocaleString('fa-IR')}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center">
                    <Check
                      size={16}
                      className="text-accent-600 dark:text-accent-400"
                    />
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}