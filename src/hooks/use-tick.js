import React from "react";

function getWaitTime(unit) {
  const now = new Date();

  if (unit === "second") {
    return 1000 - (now.getTime() % 1000);
  }

  if (unit === "day") {
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    return nextMidnight - now;
  }

  if (unit === "minute") {
    const nextMinute = new Date(now);
    nextMinute.setMinutes(now.getMinutes() + 1, 0, 0);
    return nextMinute - now;
  }

  //fallback, update once per second
  return 1000;
}

export default function useTick(unit, initialTimestamp = Date.now()) {
  const [timestamp, setTimestamp] = React.useState(initialTimestamp);

  React.useEffect(() => {
    let timeoutId = null;
    let cancelled = false;

    function tickNow() {
      setTimestamp(Date.now());
    }

    function scheduleTimeout() {
      const wait = getWaitTime(unit);

      timeoutId = window.setTimeout(() => {
        if (cancelled) return;

        tickNow();
        scheduleTimeout();
      }, wait);
    }

    tickNow();
    scheduleTimeout();

    return () => {
      // when unmount time === wait time, settimeout start running
      // cancelled variable is to prevent setState and further scheduling after unmount
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return timestamp;
}
