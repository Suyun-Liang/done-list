// import { DAY_MS } from "./const";

// date = timestamp, format="MMM dd" ||"MMM, dd, YYYY"
const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function isValidTimestamp(value) {
  return Number.isFinite(value);
}

export function formatDate(timestamp, format = "") {
  if (!isValidTimestamp(timestamp)) return "";

  const date = new Date(timestamp);
  const safeFormat = typeof format === "string" ? format : "";
  const result = [];

  const TOKEN_MAP = {
    MMM: () => MONTH_SHORT[date.getMonth()],
    MM: () => String(date.getMonth() + 1).padStart(2, "0"),
    dd: () => String(date.getDate()).padStart(2, "0"),
    YYYY: () => String(date.getFullYear()),
  };

  // format: "dd-MM-YYYY" parts: ["dd", "-","MM","-","YYYY"]
  const parts = safeFormat.match(/[a-zA-Z]+|[^a-zA-Z]+/g) ?? [safeFormat];

  for (let part of parts) {
    if (/^[a-zA-Z]+$/.test(part) && TOKEN_MAP[part]) {
      result.push(TOKEN_MAP[part]());
    } else {
      result.push(part);
    }
  }

  return result.join("");
}

export function formatRelativeTime(pastTimestamp, nowTimestamp) {
  if (!isValidTimestamp(pastTimestamp) || !isValidTimestamp(nowTimestamp)) {
    return "just now";
  }

  const now = nowTimestamp;
  const diffMs = now - pastTimestamp;

  if (diffMs < 0) return "just now";

  const minuteMs = 60 * 1000;
  const hourMs = 60 * minuteMs;

  if (diffMs < minuteMs) return "just now";
  if (diffMs < hourMs) {
    const minutes = Math.floor(diffMs / minuteMs);
    return `${minutes}m ago`;
  }

  const nowDate = new Date(now);
  const startOfToday = new Date(nowDate);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfToday.getDate() - 1);

  if (pastTimestamp >= startOfToday.getTime()) {
    const hours = Math.floor(diffMs / hourMs);
    return `${hours}h ago`;
  }

  if (
    pastTimestamp >= startOfYesterday.getTime() &&
    pastTimestamp < startOfToday.getTime()
  ) {
    return "yesterday";
  }
  return formatDate(pastTimestamp, "MMM dd");
}

// console.log(
//   formatRelativeTime(new Date("Feb 23 2026 15:20:00").getTime(), Date.now()),
// );

export function getDayKey(timestamp) {
  if (!isValidTimestamp(timestamp)) return null;

  return new Date(timestamp).setHours(0, 0, 0, 0);
}

// find the latest and earliest date from an array of dates
export function getDateBounds(entries) {
  if (!Array.isArray(entries) || entries.length === 0) return null;

  let minTimestamp = Infinity;
  let maxTimestamp = -Infinity;

  entries.forEach((e) => {
    const createdAt = e?.createdAt;
    if (!isValidTimestamp(createdAt)) return;

    minTimestamp = Math.min(minTimestamp, createdAt);
    maxTimestamp = Math.max(maxTimestamp, createdAt);
  });

  if (minTimestamp === Infinity) return null;

  return [minTimestamp, maxTimestamp];
}

//input:("2026-01-01", "2026-02-21")
//output: ["2026-01-01","2026-01-02","2026-01-03"..."2026-02-20","2026-02-21"]
export function generateDateRange(startDayMs, endDayMs) {
  if (!isValidTimestamp(startDayMs) || !isValidTimestamp(endDayMs)) return [];

  const startOfStartDayMs = new Date(startDayMs).setHours(0, 0, 0, 0);
  const startOfEndDayMs = new Date(endDayMs).setHours(0, 0, 0, 0);
  if (startOfStartDayMs > startOfEndDayMs) return [];

  const result = [];
  let curDayMs = startOfStartDayMs;
  while (curDayMs <= startOfEndDayMs) {
    result.push(curDayMs);
    const curDate = new Date(curDayMs);
    curDayMs = curDate.setDate(curDate.getDate() + 1);
  }

  return result;
}

//input = [{ id: ..., text: "...", createdAt: "2026-01-02" },
// { id: ..., text: "...", createdAt: "2026-01-05 },
// { id: ..., text: "...", createdAt: "2026-01-10 },
// { id: ..., text: "...", createdAt: "2026-01-10" }]

//output: [
// {datKey: "2026-01-10", entries: [{ ... createdAt: "2026-01-10 },{... createdAt: "2026-01-10" }]}
// {datKey: "2026-01-09", entries:[]}
// ...
// {datKey: "2026-01-02", entries:[{ ... createdAt: "2026-01-02" }]}
export function buildDailyTimeline(entries) {
  if (!Array.isArray(entries)) return [];

  const bounds = getDateBounds(entries);
  if (!bounds) return [];
  const [startDayMs, endDayMs] = bounds;
  const dateRangeMs = generateDateRange(startDayMs, endDayMs);
  const map = new Map();

  dateRangeMs.forEach((curDayMs) => {
    const dayKey = getDayKey(curDayMs);
    map.set(dayKey, []);
  });

  // {"2026-01-02":[], "2026-01-09":[] ...}
  entries.forEach((entry) => {
    const dayKey = getDayKey(entry?.createdAt);
    if (dayKey === null) return;

    if (!map.has(dayKey)) map.set(dayKey, []);

    map.get(dayKey).push(entry);
  });

  const result = dateRangeMs
    .slice()
    .reverse()
    .map((dayMs) => {
      const dayKey = getDayKey(dayMs);

      return { dayKey, entries: map.get(dayKey) };
    });

  return result;
}

//input = [{ id: ..., text: "...", createdAt: "2026-01-02" },
// { id: ..., text: "...", createdAt: "2026-01-05 },
// { id: ..., text: "...", createdAt: "2026-01-10 },
// { id: ..., text: "...", createdAt: "2026-01-10" }]

//output: [
// {datKey: "2026-01-10", entries: [{ ... createdAt: "2026-01-10 },{... createdAt: "2026-01-10" }]}
// {datKey: "2026-01-05", entries:[{... createdAt:"2026-01-05"},...]}
// {datKey: "2026-01-04", entries:[]}
// {datKey: "2026-01-03", entries:[]}
// {datKey: "2026-01-02", entries:[{ ... createdAt: "2026-01-02" }]}
export function buildCompactTimeline(entries, fillGapsUpToDays = 3) {
  if (!Array.isArray(entries)) return [];
  const map = new Map();

  // {"2026-01-02":[...], "2026-01-05":[...],"2026-01-10":[...]}
  entries.forEach((entry) => {
    const dayKey = getDayKey(entry?.createdAt);
    if (dayKey === null) return;

    if (!map.has(dayKey)) map.set(dayKey, []);

    map.get(dayKey).push(entry);
  });

  // [Number("2026-01-10"), Number("2026-01-05"), Number("2026-01-02")]
  const activeDays = Array.from(map.keys())
    .map((dayKey) => Number(dayKey))
    .sort((a, b) => b - a);

  const result = [];

  // compare curDay with nextDay to validate the gap
  // if gap is valid add gap days into the result
  activeDays.forEach((curDayMs, index) => {
    result.push({
      dayKey: curDayMs,
      entries: map.get(curDayMs),
    });

    const nextDayMs = activeDays[index + 1];
    if (nextDayMs === undefined) return;

    const gapDays = (curDayMs - nextDayMs) / DAY_MS - 1;

    if (gapDays > 0 && gapDays <= fillGapsUpToDays) {
      for (let i = 1; i <= gapDays; i++) {
        const emptyDayMs = curDayMs - i * DAY_MS;

        result.push({
          dayKey: emptyDayMs,

          entries: [],
        });
      }
    }
  });

  return result;
}

export function groupEntriesByDay(entries) {
  if (!Array.isArray(entries)) return [];

  const map = new Map();

  entries.forEach((entry) => {
    const dayKey = getDayKey(entry?.createdAt);
    if (dayKey === null) return;

    if (!map.has(dayKey)) map.set(dayKey, []);

    map.get(dayKey).push(entry);
  });

  const result = Array.from(map.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([dayKey, entries]) => ({ dayKey, entries }));

  return result;
}

export function normalizeEntry(e) {
  return {
    ...e,
    notes: e.notes ?? [],
  };
}
