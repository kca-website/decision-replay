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
  return from + days * 24 * 60 * 60 * 1000;
};

export const getTimeOfDayGreeting = (): 'greetMorning' | 'greetAfternoon' | 'greetEvening' | 'greetNight' => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'greetMorning';
  if (h >= 12 && h < 17) return 'greetAfternoon';
  if (h >= 17 && h < 22) return 'greetEvening';
  return 'greetNight';
};
