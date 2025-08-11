import { startOfWeek, endOfWeek, format } from 'date-fns';

export const getThisWeekRange = (): string => {
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(today, { weekStartsOn: 1 }); // Sunday

  const startFormat = start.getMonth() === end.getMonth() ? "dd" : "dd MMM";
  return `${format(start, startFormat)} - ${format(end, "dd MMM")}`;
};

export const getCurrentMonth = (withYear?: boolean): string => {
  const today = new Date();
  const monthName = format(today, "MMMM");
  const year = format(today, "yyyy");
  return `${monthName}${withYear ? " " + year : ""}`;
};

export const getMonday = (date = new Date()): string => {
  const day = date.getDay(); // 0 (Sun) - 6 (Sat)
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  const monday = new Date(date.setDate(diff));
  monday.setHours(0, 0, 0, 0); 

  // 🧠 construct ISO string using local values
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, "0");
  const dayOfMonth = String(monday.getDate()).padStart(2, "0");

  return `${year}-${month}-${dayOfMonth}T00:00:00.000Z`;
};