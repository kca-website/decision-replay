export const formatDate = (ts: number, locale: string): string => {
  return new Date(ts).toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateShort = (ts: number, locale: string): string => {
  return new Date(ts).toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US', {
    day: '2-digit',
    month: 'short',
  });
};

export const daysUntil = (ts: number, now = Date.now()): number => {
  return Math.ceil((ts - now) / (1000 * 60 * 60 * 24));
};

export const addDays = (days: number, from = Date.now()): number => {
  const date = new Date(from);
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date.getTime();
};

export const toDateInputValue = (ts: number): string => {
  const date = new Date(ts);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const fromDateInputValue = (value: string): number => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0).getTime();
};

export const getTimeOfDayGreeting = (): 'greetMorning' | 'greetAfternoon' | 'greetEvening' | 'greetNight' => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'greetMorning';
  if (h >= 12 && h < 17) return 'greetAfternoon';
  if (h >= 17 && h < 22) return 'greetEvening';
  return 'greetNight';
};
