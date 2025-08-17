import MonthGrid from "./month-grid";

export default function MonthView() {
  return (
    <div className="grid grid-cols-3 gap-2 w-full py-4">
      <MonthGrid />
      <MonthGrid />
      <MonthGrid />
    </div>
  );
}
