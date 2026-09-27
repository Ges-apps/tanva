import type { FoodItem, LoggedFood, MealType } from '@/types';

import { uid } from '@/utils/format';


export function computeNutrition(food: FoodItem, quantity: number) {
  let multiplier: number;

  if (food.unit === 'عدد') {
    if (food.servingWeightGrams) {
      const totalWeightGrams = quantity * food.servingWeightGrams;

      multiplier = totalWeightGrams / 100;
    } else {
      multiplier = quantity;
    }
  }

  else if (food.unit === 'گرم') {
    multiplier = quantity / 100;
  }

  // غذاهای بر اساس میلی‌لیتر
  else if (food.unit === 'میلی‌لیتر') {
    multiplier = quantity / 100;
  }
  else {
    multiplier = quantity;
  }

  return {
    calories: food.calories * multiplier,
    protein: food.protein * multiplier,
    carbs: food.carbs * multiplier,
    fat: food.fat * multiplier,
  };
}

export function createLoggedFood(
  food: FoodItem,
  quantity: number,
  meal: MealType,
): LoggedFood {
  const n = computeNutrition(food, quantity);

  return {
    id: uid(),
    foodId: food.id,
    foodName: food.name,
    meal,
    quantity,
    calories: n.calories,
    protein: n.protein,
    carbs: n.carbs,
    fat: n.fat,
    loggedAt: Date.now(),
  };
}

export function sumNutrition(foods: LoggedFood[]) {
  return foods.reduce(
    (acc, f) => ({
      calories: acc.calories + f.calories,
      protein: acc.protein + f.protein,
      carbs: acc.carbs + f.carbs,
      fat: acc.fat + f.fat,
    }),
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
  );
}