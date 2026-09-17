type TDateFormat =
  | "short" // 15.09.2026
  | "long" // 15 сентября 2026 г.
  | "full" // вторник, 15 сентября 2026 г.
  | "year" // 2026
  | "month" // сентябрь
  | "day" // 15
  | "time" // 12:30
  | "dateTime" // 15.09.2026, 12:30
  | "monthYear" // сентябрь 2026 г.
  | "dayMonth" // 15 сентября
  | "weekday" // вторник
  | "weekdayShort"; // вт

const DATE_FORMATS: Record<TDateFormat, Intl.DateTimeFormatOptions> = {
  short: {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },

  long: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },

  full: {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  },

  year: {
    year: "numeric",
  },

  month: {
    month: "long",
  },

  day: {
    day: "numeric",
  },

  time: {
    hour: "2-digit",
    minute: "2-digit",
  },

  dateTime: {
    dateStyle: "short",
    timeStyle: "short",
  },

  monthYear: {
    month: "long",
    year: "numeric",
  },

  dayMonth: {
    day: "numeric",
    month: "long",
  },

  weekday: {
    weekday: "long",
  },

  weekdayShort: {
    weekday: "short",
  },
};

export function formatDate(
  value: string | Date,
  format: TDateFormat = "short",
): string {
  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat("ru-RU", DATE_FORMATS[format]).format(date);
}
