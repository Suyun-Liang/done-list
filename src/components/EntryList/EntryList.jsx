import React, { useEffect, useState } from "react";
import EntryItem from "../EntryItem/EntryItem";

function EntryList({ entries, ...delegated }) {
  return (
    <div>
      <ul>
        {entries.map((entry) => (
          <EntryItem key={entry.id} entry={entry} {...delegated} />
        ))}
      </ul>
    </div>
  );
}

export default EntryList;
