export type CycleType = "monthly" | "3-week" | "2-week";

export interface Period {
  start: string;
  end: string;
  label: string;
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(d: Date, n: number): Date {
  const result = new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  return result;
}

function dayOfYear(date: Date): number {
  const jan1 = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - jan1.getTime();
  return Math.round(diff / 86400000);
}

function cycleDays(cycle: CycleType): number {
  if (cycle === "3-week") return 21;
  if (cycle === "2-week") return 14;
  return 0;
}

function getMonthlyPeriod(date: Date): Period {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return {
    start: formatDate(start),
    end: formatDate(end),
    label: start.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  };
}

function getWeekPeriod(date: Date, days: number): Period {
  const doy = dayOfYear(date);
  const periodIndex = Math.floor(doy / days);
  const jan1 = new Date(date.getFullYear(), 0, 1);
  const start = addDays(jan1, periodIndex * days);
  const nextYearJan1 = new Date(date.getFullYear() + 1, 0, 1);
  let end = addDays(start, days);
  if (end > nextYearJan1) end = nextYearJan1;
  return { start: formatDate(start), end: formatDate(end), label: buildRangeLabel(start, addDays(end, -1)) };
}

function buildRangeLabel(start: Date, endInclusive: Date): string {
  const sMonth = start.toLocaleDateString("en-US", { month: "short" });
  const eMonth = endInclusive.toLocaleDateString("en-US", { month: "short" });
  const sDay = start.getDate();
  const eDay = endInclusive.getDate();
  const year = endInclusive.getFullYear();

  if (sMonth === eMonth) {
    return `${sMonth} ${sDay} – ${eDay}, ${year}`;
  }
  return `${sMonth} ${sDay} – ${eMonth} ${eDay}, ${year}`;
}

export function getPeriodForDate(date: Date, cycle: CycleType): Period {
  if (cycle === "monthly") return getMonthlyPeriod(date);
  return getWeekPeriod(date, cycleDays(cycle));
}

export function getNextPeriod(period: Period, cycle: CycleType): Period {
  const end = parseDateString(period.end);
  return getPeriodForDate(end, cycle);
}

export function getPrevPeriod(period: Period, cycle: CycleType): Period {
  const start = parseDateString(period.start);
  const prev = addDays(start, -1);
  return getPeriodForDate(prev, cycle);
}

export function parseDateString(str: string): Date {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}
