import {
  startOfWeek,
  endOfWeek,
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getDay,
} from "date-fns";

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

export const formatTodayString = () => {
  const today = new Date();
  const day = today.getDate();
  const monthName = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();

  // Get day suffix
  const getDaySuffix = (d: number) => {
    if (d >= 11 && d <= 13) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const daySuffix = getDaySuffix(day);
  const weekday = today.toLocaleString("en-US", { weekday: "long" });

  return `${weekday} ${monthName.toLowerCase()} ${day}${daySuffix}, ${year}`;
};

export const formatDatePayload = (dateOffset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + dateOffset);
  return format(date, "yyyy-MM-dd");
};

export const formatWeek = (weekOffset: number = 0) => {
  const today = new Date();
  // Adjust date by weekOffset
  today.setDate(today.getDate() + weekOffset * 7);

  const start = startOfWeek(today, { weekStartsOn: 1 });
  const end = endOfWeek(today, { weekStartsOn: 1 });

  const startMonth = format(start, "MMM").toLowerCase();
  const startDay = format(start, "d");
  const endDay = format(end, "d");
  const year = format(end, "yyyy");

  return `${
    startMonth.charAt(0).toUpperCase() + startMonth.slice(1)
  } ${startDay}-${endDay}, ${year}`;
};

// Get config data for given month
export function getMonthData(year: number, month: number): MonthConfig {
  const start = startOfMonth(new Date(year, month, 1));
  const end = endOfMonth(start);
  return {
    dates: eachDayOfInterval({ start, end }).map((date) =>
      format(date, "yyyy-MM-dd")
    ),
    firstDay: getDay(start),
  };
}

