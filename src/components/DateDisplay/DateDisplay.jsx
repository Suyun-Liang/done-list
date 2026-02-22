import React from "react";
import useTick from "../../hooks/use-tick";

function DateDisplay() {
  // clock tick on : "second" || "day"
  const { timestamp } = useTick("second");

  return <div>{new Date(timestamp).toLocaleString()}</div>;
}

export default DateDisplay;
