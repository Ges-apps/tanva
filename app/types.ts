export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodItem {
  id: string;
  name: string;
  nameEn: string;
  unit: string;
  // per 1 unit
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize?: number;
  servingUnit?: string;
  servingWeightGrams?: number;
  fdcId?: number;
  source?: string;
}

export interface LoggedFood {
  id: string;
  foodId: string;
  foodName: string;
  meal: MealType;
  quantity: number;
  // computed at log time per quantity
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  loggedAt: number;
}

export interface DayLog {
  date: string; // YYYY-MM-DD
  foods: LoggedFood[];
}

export interface Goals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type Theme = 'light' | 'dark';

export type View = 'dashboard' | 'add' | 'history' | 'settings';
