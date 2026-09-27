const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianNum(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[parseInt(d, 10)]);
}

export function formatNum(value: number, decimals = 0): string {
  const rounded = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  return toPersianNum(rounded);
}

export function todayKey(): string {
  const d = new Date();
  return dateKey(d);
}

export function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const WEEKDAYS = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
const MONTHS = [
  'ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن',
  'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر',
];

export function formatDateLabel(key: string): string {
  const d = new Date(key + 'T00:00:00');
  return `${WEEKDAYS[d.getDay()]} ${toPersianNum(d.getDate())} ${MONTHS[d.getMonth()]}`;
}

export function isToday(key: string): boolean {
  return key === todayKey();
}

export function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
