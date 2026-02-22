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

export function formatDate(timestamp, format) {
  const date = new Date(timestamp);
  const result = [];

  const TOKEN_MAP = {
    MMM: () => MONTH_SHORT[date.getMonth()],
    MM: () => String(date.getMonth() + 1).padStart(2, "0"),
    dd: () => String(date.getDate()).padStart(2, "0"),
    YYYY: () => String(date.getFullYear()),
  };

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
