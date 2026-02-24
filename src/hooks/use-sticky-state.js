import React from "react";

export function useStickyState(key, defaultVal) {
  const [value, setValue] = React.useState(() => {
    const stickyVal = window.localStorage.getItem(key);
    return stickyVal !== null ? JSON.parse(stickyVal) : defaultVal;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
