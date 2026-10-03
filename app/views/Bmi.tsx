"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowLeft,
  Flame,
  HeartPulse,
  Scale,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Weight,
} from "lucide-react";

type Gender = "male" | "female";

type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very-active";

type BmiCategory = {
  label: string;
  description: string;
  min: number;
  max: number;
};

const BMI_CATEGORIES: BmiCategory[] = [
  {
    label: "کمبود وزن",
    description: "وزن شما پایین‌تر از محدوده نرمال است.",
    min: 0,
    max: 18.5,
  },
  {
    label: "وزن نرمال",
    description: "BMI شما در محدوده نرمال قرار دارد.",
    min: 18.5,
    max: 25,
  },
  {
    label: "اضافه‌وزن",
    description: "وزن شما کمی بالاتر از محدوده نرمال است.",
    min: 25,
    max: 30,
  },
  {
    label: "چاقی",
    description: "BMI شما در محدوده چاقی قرار دارد.",
    min: 30,
    max: Infinity,
  },
];

const ACTIVITY_LEVELS: {
  value: ActivityLevel;
  label: string;
  description: string;
  multiplier: number;
}[] = [
  {
    value: "sedentary",
    label: "کم‌تحرک",
    description: "فعالیت بسیار کم",
    multiplier: 1.2,
  },
  {
    value: "light",
    label: "فعالیت سبک",
    description: "۱ تا ۳ روز در هفته",
    multiplier: 1.375,
  },
  {
    value: "moderate",
    label: "فعالیت متوسط",
    description: "۳ تا ۵ روز در هفته",
    multiplier: 1.55,
  },
  {
    value: "active",
    label: "فعال",
    description: "۶ تا ۷ روز در هفته",
    multiplier: 1.725,
  },
  {
    value: "very-active",
    label: "بسیار فعال",
    description: "تمرین سنگین روزانه",
    multiplier: 1.9,
  },
];

function getBmiCategory(bmi: number): BmiCategory {
  return (
    BMI_CATEGORIES.find(
      (category) => bmi >= category.min && bmi < category.max,
    ) ?? BMI_CATEGORIES[0]
  );
}

function getBmiProgress(bmi: number): number {
  // Visual scale from BMI 15 → 35.
  const min = 15;
  const max = 35;

  return Math.min(100, Math.max(0, ((bmi - min) / (max - min)) * 100));
}

function roundCalories(value: number): number {
  return Math.round(value / 10) * 10;
}

function roundProtein(value: number): number {
  return Math.round(value);
}

export default function Bmi() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");

  const result = useMemo(() => {
    const heightCm = Number(height);
    const weightKg = Number(weight);
    const ageYears = Number(age);

    if (
      !Number.isFinite(heightCm) ||
      !Number.isFinite(weightKg) ||
      !Number.isFinite(ageYears) ||
      heightCm <= 0 ||
      weightKg <= 0 ||
      ageYears <= 0
    ) {
      return null;
    }

    if (
      heightCm < 100 ||
      heightCm > 250 ||
      weightKg < 20 ||
      weightKg > 300 ||
      ageYears < 13 ||
      ageYears > 120
    ) {
      return null;
    }

    const heightMeters = heightCm / 100;

    const bmi = weightKg / (heightMeters * heightMeters);

    // Mifflin-St Jeor equation.
    const bmr =
      gender === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;

    const activityData = ACTIVITY_LEVELS.find(
      (item) => item.value === activity,
    );

    const tdee = bmr * (activityData?.multiplier ?? 1.55);

    /*
     * A practical general protein target.
     *
     * 1.6 g/kg is used as a neutral target for active adults.
     * This is not intended as medical or therapeutic nutrition advice.
     */
    const protein = weightKg * 1.6;

    return {
      bmi,
      category: getBmiCategory(bmi),
      bmr,
      calories: roundCalories(tdee),
      protein: roundProtein(protein),
      progress: getBmiProgress(bmi),
    };
  }, [height, weight, age, gender, activity]);

  const handleNumberInput = (
    value: string,
    setter: (value: string) => void,
  ) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };
  useEffect(() => {
    console.log("hello");
  }, []);
  return (
    <div dir="rtl" className="space-y-5 animate-fade-in pb-6">
      {/* Header */}
      <div className="pt-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-500 dark:bg-accent-400/10 dark:text-accent-400">
            <Activity size={22} strokeWidth={2.2} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              محاسبه BMI
            </h1>

            <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
              شاخص توده بدنی و نیاز روزانه شما
            </p>
          </div>
        </div>
      </div>

      {/* Input Card */}
      <section className="glass rounded-3xl p-5">
        <div className="mb-5 flex items-center gap-2">
          <Scale size={18} className="text-accent-500 dark:text-accent-400" />

          <h2 className="font-semibold text-gray-800 dark:text-gray-50">
            اطلاعات بدن
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Height */}
          <div>
            <label
              htmlFor="bmi-height"
              className="mb-2 block text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              قد
            </label>

            <div className="relative">
              <input
                id="bmi-height"
                type="text"
                inputMode="decimal"
                value={height}
                onChange={(event) =>
                  handleNumberInput(event.target.value, setHeight)
                }
                placeholder="175"
                className="h-13 w-full rounded-2xl border border-gray-200/70 bg-white/60 px-4 pl-14 text-right text-sm font-medium text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-accent-500/50 focus:ring-4 focus:ring-accent-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
              />

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                سانتی‌متر
              </span>
            </div>
          </div>

          {/* Weight */}
          <div>
            <label
              htmlFor="bmi-weight"
              className="mb-2 block text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              وزن
            </label>

            <div className="relative">
              <input
                id="bmi-weight"
                type="text"
                inputMode="decimal"
                value={weight}
                onChange={(event) =>
                  handleNumberInput(event.target.value, setWeight)
                }
                placeholder="70"
                className="h-13 w-full rounded-2xl border border-gray-200/70 bg-white/60 px-4 pl-10 text-right text-sm font-medium text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-accent-500/50 focus:ring-4 focus:ring-accent-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
              />

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                کیلو
              </span>
            </div>
          </div>
        </div>

        {/* Age */}
        <div className="mt-4">
          <label
            htmlFor="bmi-age"
            className="mb-2 block text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            سن
          </label>

          <div className="relative">
            <UserRound
              size={17}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="bmi-age"
              type="text"
              inputMode="numeric"
              value={age}
              onChange={(event) =>
                handleNumberInput(event.target.value, setAge)
              }
              placeholder="25"
              className="h-13 w-full rounded-2xl border border-gray-200/70 bg-white/60 px-11 pl-16 text-right text-sm font-medium text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-accent-500/50 focus:ring-4 focus:ring-accent-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
            />

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              سال
            </span>
          </div>
        </div>

        {/* Gender */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            جنسیت
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setGender("male")}
              className={`flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all ${
                gender === "male"
                  ? "bg-accent-500 text-white shadow-lg shadow-accent-500/20"
                  : "bg-gray-100/70 text-gray-500 hover:bg-gray-200/70 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
              }`}
            >
              <UserRound size={16} />
              مرد
            </button>

            <button
              type="button"
              onClick={() => setGender("female")}
              className={`flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all ${
                gender === "female"
                  ? "bg-accent-500 text-white shadow-lg shadow-accent-500/20"
                  : "bg-gray-100/70 text-gray-500 hover:bg-gray-200/70 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
              }`}
            >
              <UserRound size={16} />
              زن
            </button>
          </div>
        </div>

        {/* Activity */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              سطح فعالیت
            </p>

            <Activity
              size={15}
              className="text-accent-500 dark:text-accent-400"
            />
          </div>

          <div className="space-y-2">
            {ACTIVITY_LEVELS.map((item) => {
              const selected = activity === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setActivity(item.value)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-right transition-all ${
                    selected
                      ? "border-accent-500/30 bg-accent-500/10"
                      : "border-gray-200/60 bg-white/40 hover:bg-white/70 dark:border-white/5 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
                  }`}
                >
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        selected
                          ? "text-accent-600 dark:text-accent-400"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {item.label}
                    </p>

                    <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`h-4 w-4 rounded-full border-2 transition-all ${
                      selected
                        ? "border-accent-500 bg-accent-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {selected && (
                      <div className="h-full w-full scale-50 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Empty State */}
      {!result && (
        <div className="glass rounded-3xl p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-500 dark:bg-accent-400/10 dark:text-accent-400">
            <HeartPulse size={26} />
          </div>

          <h3 className="font-semibold text-gray-800 dark:text-white">
            اطلاعاتت رو وارد کن
          </h3>

          <p className="mx-auto mt-2 max-w-xs text-xs leading-6 text-gray-400 dark:text-gray-500">
            قد، وزن و سن خودت رو وارد کن تا BMI و نیاز تقریبی روزانه‌ات محاسبه
            بشه.
          </p>
        </div>
      )}

      {/* Result */}
      {result && (
        <>
          {/* BMI Card */}
          <section className="glass-strong relative overflow-hidden rounded-3xl p-6">
            <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-accent-500/10 blur-3xl" />

            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    شاخص توده بدنی
                  </p>

                  <h2 className="mt-1 font-semibold text-gray-800 dark:text-white">
                    BMI شما
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500 dark:bg-accent-400/10 dark:text-accent-400">
                  <TrendingUp size={19} />
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-8 border-accent-500/10">
                  <div className="text-center">
                    <div className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
                      {result.bmi.toFixed(1)}
                    </div>

                    <div className="mt-0.5 text-[10px] text-gray-400">BMI</div>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="inline-flex rounded-xl bg-accent-500/10 px-3 py-1.5 text-sm font-semibold text-accent-600 dark:bg-accent-400/10 dark:text-accent-400">
                    {result.category.label}
                  </div>

                  <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                    {result.category.description}
                  </p>
                </div>
              </div>

              {/* BMI Scalze */}
              <div className="mt-7" dir="ltr">
                <div className="relative h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                  {/* کمبود وزن: BMI < 18.5 */}
                  <div className="absolute inset-y-0 left-0 w-[17.5%] bg-sky-400/70" />

                  {/* نرمال: 18.5 - 25 */}
                  <div className="absolute inset-y-0 left-[17.5%] w-[32.5%] bg-accent-500/70" />

                  {/* اضافه وزن: 25 - 30 */}
                  <div className="absolute inset-y-0 left-[50%] w-[25%] bg-amber-400/70" />

                  {/* چاقی: 30+ */}
                  <div className="absolute inset-y-0 left-[75%] right-0 bg-red-400/70" />

                  {/* نشانگر BMI */}
                  <div
                    className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-gray-800 shadow-md dark:border-gray-900 dark:bg-white"
                    style={{
                      left: `${result.progress}%`,
                    }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-[9px] text-gray-400 dark:text-gray-500">
                  <span>کمبود وزن</span>
                  <span>نرمال</span>
                  <span>اضافه‌وزن</span>
                  <span>چاقی</span>
                </div>
              </div>
            </div>
          </section>

          {/* Daily Needs */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Target
                size={18}
                className="text-accent-500 dark:text-accent-400"
              />

              <h2 className="font-semibold text-gray-800 dark:text-gray-50">
                نیاز روزانه
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Calories */}
              <div className="glass rounded-2xl p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                    <Flame size={18} />
                  </div>

                  <span className="text-[10px] text-gray-400">kcal / روز</span>
                </div>

                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {result.calories.toLocaleString("fa-IR")}
                </p>

                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  کالری نگهدارنده
                </p>
              </div>

              {/* Protein */}
              <div className="glass rounded-2xl p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500 dark:bg-accent-400/10 dark:text-accent-400">
                    <Weight size={18} />
                  </div>

                  <span className="text-[10px] text-gray-400">گرم / روز</span>
                </div>

                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {result.protein.toLocaleString("fa-IR")}
                </p>

                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  پروتئین پیشنهادی
                </p>
              </div>
            </div>
          </section>


          {/* Recalculate hint */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500">
            <ArrowLeft size={13} />
            برای محاسبه مجدد، اطلاعات بالا را تغییر دهید
          </div>
        </>
      )}
    </div>
  );
}
