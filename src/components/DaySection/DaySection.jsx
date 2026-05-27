import React from "react";
import styles from "./DaySection.module.css";
import EntryList from "../EntryList";
import { formatDate } from "../../utils";

function DaySection({ dayKey, entries, ...delegated }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.date}>{formatDate(dayKey, "YYYY-MMM-dd")}</div>
      {entries.length > 0 && <EntryList entries={entries} {...delegated} />}
      {entries.length === 0 && (
        <p className={styles.quietDay}>A quiet day...</p>
      )}
    </div>
  );
}

export default DaySection;
