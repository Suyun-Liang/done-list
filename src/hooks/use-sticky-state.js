"use client";

import React from "react";

export function useStickyState(key, defaultVal) {
  const [value, setValue] = React.useState(defaultVal);

  React.useEffect(() => {
    const stickyVal = window.localStorage.getItem(key);
    setValue(stickyVal === null ? defaultVal : JSON.parse(stickyVal));
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
