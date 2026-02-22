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

  //fallback, update once per second
  return 1000;
}

export default function useTick(unit) {
  const [timestamp, setTimestamp] = React.useState(Date.now());

  React.useEffect(() => {
    let timeoutId = null;
    let cancelled = false;

    function scheduleTimeout() {
      let wait = getWaitTime(unit);

      timeoutId = window.setTimeout(() => {
        if (cancelled) return;

        setTimestamp(Date.now());
        scheduleTimeout();
      }, wait);
    }

    scheduleTimeout();

    return () => {
      // when unmount time === wait time, settimeout start running
      // cancelled variable is to prevent setState and further scheduling after unmount
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return { timestamp };
}
