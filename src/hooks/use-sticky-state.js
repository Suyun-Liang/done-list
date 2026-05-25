"use client";

import React from "react";

export function useStickyState(key, defaultVal) {
  const [value, setValue] = React.useState(defaultVal);
  // prevent defaultVal be written into Local Storage
  // before its loaded on the 1st render
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = React.useState(false);

  React.useEffect(() => {
    const stickyVal = window.localStorage.getItem(key);
    setValue(stickyVal === null ? defaultVal : JSON.parse(stickyVal));
    setHasLoadedFromStorage(true);
  }, []);

  React.useEffect(() => {
    if (!hasLoadedFromStorage) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
