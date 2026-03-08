import React from "react";
import EntryList from "../EntryList";
import { formatDate } from "../../utils";

function DaySection({ dayKey, entries, ...delegated }) {
  return (
    <div>
      <div>{formatDate(dayKey, "YYYY-MMM-dd")}</div>
      {entries.length > 0 && <EntryList entries={entries} {...delegated} />}
      {entries.length === 0 && <p>(A quiet day...)</p>}
    </div>
  );
}

export default DaySection;
