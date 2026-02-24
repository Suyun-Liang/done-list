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

export function formatDate(timestamp, format = "") {
  const date = new Date(timestamp);
  const result = [];

  const TOKEN_MAP = {
    MMM: () => MONTH_SHORT[date.getMonth()],
    MM: () => String(date.getMonth() + 1).padStart(2, "0"),
    dd: () => String(date.getDate()).padStart(2, "0"),
    YYYY: () => String(date.getFullYear()),
  };

  // format: "dd-MM-YYYY" parts: ["dd", "-","MM","-","YYYY"]
  const parts = format.match(/[a-zA-Z]+|[^a-zA-Z]+/g) ?? [format];

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
