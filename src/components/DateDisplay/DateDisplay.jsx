import React from "react";
import useTick from "../../hooks/use-tick";
import { formatDate } from "../../utils";

function DateDisplay() {
  // clock tick on : "second" || "day"
  const { timestamp } = useTick("second");

  return (
    <>
      <div>{new Date(timestamp).toLocaleString()}</div>
      <div>{formatDate(timestamp, "MMM dd")}</div>
    </>
  );
}

export default DateDisplay;
